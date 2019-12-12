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

const cp = require('child_process');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const DEPLOY_MODEL_REGION_TAG = 'vision_classification_deploy_model_node_count';
const LOCATION = 'us-central1';
const MODEL_ID = 'ICN5317963909599068160';

describe('Automl Deploy Model Test', () => {
  const client = new AutoMlClient();

  before('should verify the model is not deployed', async () => {
    const projectId = await client.getProjectId();
    const request = {
      name: client.modelPath(projectId, LOCATION, MODEL_ID),
    };

    const [response] = await client.getModel(request);
    if (response.deploymentState === 'DEPLOYED') {
      const request = {
        name: client.modelPath(projectId, LOCATION, MODEL_ID),
      };

      const [operation] = await client.undeployModel(request);

      // Wait for operation to complete.
      await operation.promise();
    }
  });

  it('should deploy a model', async () => {
    const projectId = await client.getProjectId();
    const deploy_output = execSync(
      `node ${DEPLOY_MODEL_REGION_TAG}.js ${projectId} ${LOCATION} ${MODEL_ID}`
    );

    assert.match(deploy_output, /Model deployment finished./);
  });
});