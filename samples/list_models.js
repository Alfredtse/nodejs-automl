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

function main(projectId = 'YOUR_PROJECT_ID') {
  // [START automl_list_models]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';

  // Imports the Google Cloud AutoML library
  const {AutoMlClient} = require(`@google-cloud/automl`);

  // Instantiates a client
  const client = new AutoMlClient();

  async function listModels() {
    // Construct request
    const request = {
      parent: client.locationPath(projectId, 'us-central1'),
      filter: 'translation_model_metadata:*',
    };

    const [response] = await client.listModels(request);

    console.log(`List of models:`);
    for (const model of response) {
      console.log(`Model name: ${model.name}`);
      console.log(`
        Model id: ${model.name.split('/')[model.name.split('/').length - 1]}`);
      console.log(`Model display name: ${model.displayName}`);
      console.log(`Model create time`);
      console.log(`\tseconds ${model.createTime.seconds}`);
      console.log(`\tnanos ${model.createTime.nanos / 1e9}`);
      console.log(`Model deployment state: ${model.deploymentState}`);
    }
  }

  listModels();
  // [END automl_list_models]
}

main(...process.argv.slice(2));