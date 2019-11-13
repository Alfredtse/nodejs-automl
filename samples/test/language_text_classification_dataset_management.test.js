/**
 * Copyright 2019 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {assert} = require('chai');
const {AutoMlClient} = require('@google-cloud/automl').v1;
const {Storage} = require('@google-cloud/storage');

const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const CREATE_DATASET_REGION_TAG = 'language_text_classification_create_dataset';
const IMPORT_DATASET_REGION_TAG = 'import_dataset';
const DELETE_DATASET_REGION_TAG = 'delete_dataset';
const LIST_DATASET_REGION_TAG = 'list_datasets';
const GET_DATASET_REGION_TAG = 'get_dataset';
const DATASET_ID = 'TCN4742936920458264576';
const EXPORT_DATASET_REGION_TAG = 'export_dataset';
const LOCATION = 'us-central1';

describe('Automl Natural Language Text Classification Dataset Tests', () => {
  const client = new AutoMlClient();

  it('should create, import, and delete a dataset', async () => {
    const projectId = await client.getProjectId();
    const displayName = `test_${uuid
      .v4()
      .replace(/-/g, '_')
      .substring(0, 26)}`;

    // create
    const create_output = execSync(
      `node ${CREATE_DATASET_REGION_TAG}.js ${projectId} ${LOCATION} ${displayName}`
    );
    assert.match(create_output, /Dataset id:/);

    const datasetId = create_output.split('Dataset id: ')[1].split('\n')[0];

    // import'
    const data = `gs://${projectId}-lcm/classification/dataset.csv`;
    const import_output = execSync(
      `node ${IMPORT_DATASET_REGION_TAG}.js ${projectId} ${LOCATION} ${datasetId} ${data}`
    );
    assert.match(import_output, /Dataset imported/);

    // delete
    const delete_output = execSync(
      `node ${DELETE_DATASET_REGION_TAG}.js ${projectId} ${LOCATION} ${datasetId}`
    );
    assert.match(delete_output, /Dataset deleted/);
  });

  it('should list datasets', async () => {
    const projectId = await client.getProjectId();
    const list_output = execSync(
      `node ${LIST_DATASET_REGION_TAG}.js ${projectId} ${LOCATION}`
    );

    assert.match(list_output, /Dataset id/);
  });

  it('should get a dataset', async () => {
    const projectId = await client.getProjectId();
    const get_output = execSync(
      `node ${GET_DATASET_REGION_TAG}.js ${projectId} ${LOCATION} ${DATASET_ID}`
    );

    assert.match(get_output, /Dataset id/);
  });

  it('should export a datset', async () => {
    const projectId = await client.getProjectId();
    const bucketName = `${projectId}-lcm`;
    const prefix = 'TEST_EXPORT_OUTPUT';
    const export_output = execSync(
      `node ${EXPORT_DATASET_REGION_TAG}.js ${projectId} ${LOCATION} ${DATASET_ID} gs://${bucketName}/${prefix}/`
    );

    assert.match(export_output, /Dataset exported/);

    // Delete created files
    const storageClient = new Storage();
    const options = {
      prefix: prefix,
    };
    const [files] = await storageClient
      .bucket(`gs://${bucketName}`)
      .getFiles(options);
    files.forEach(file => {
      storageClient
        .bucket(`gs://${bucketName}`)
        .file(file.name)
        .delete();
    });
  });
});
