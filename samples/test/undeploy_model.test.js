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

const UNDEPLOY_MODEL_REGION_TAG = 'undeploy_model';
const LOCATION = 'us-central1';
const MODEL_ID = 'TCN7483069430457434112';

describe('Automl Undeploy Model Test', () => {
  const client = new AutoMlClient();

  before('should verify the model is deployed', async () => {
    const projectId = await client.getProjectId();
    const request = {
      name: client.modelPath(projectId, LOCATION, MODEL_ID),
    };

    const [response] = await client.getModel(request);
    if (response.deploymentState === 'UNDEPLOYED') {
      const request = {
        name: client.modelPath(projectId, LOCATION, MODEL_ID),
      };

      const [operation] = await client.deployModel(request);

      // Wait for operation to complete.
      await operation.promise();
    }
  });

  it('should undeploy a model', async () => {
    const projectId = await client.getProjectId();
    const deploy_output = execSync(
      `node ${UNDEPLOY_MODEL_REGION_TAG}.js ${projectId} ${LOCATION} ${MODEL_ID}`
    );

    assert.match(deploy_output, /Model undeployment finished./);
  });
});