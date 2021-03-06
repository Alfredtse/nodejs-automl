// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';
function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  modelId = 'MODEL_ID'
) {
  // [START automl_vision_object_detection_undeploy_model]
  /**
   * Demonstrates using the AutoML client to undeploy model.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const modelId = '[MODEL_ID]' e.g., "TEN5200971474357190656";

  //Imports the Google Cloud Automl library
  const {AutoMlClient} = require('@google-cloud/automl').v1beta1;

  // Instantiates a client
  const automlClient = new AutoMlClient();

  async function undeployModel() {
    // Get the full path of the model.
    const modelFullId = automlClient.modelPath(
      projectId,
      computeRegion,
      modelId
    );

    // Deploy a model with the deploy model request.
    const [operation] = await automlClient.undeployModel({name: modelFullId});
    const [response] = await operation.promise();
    for (const element of response) {
      console.log(`Undeployment Details:`);
      console.log(`\tName: ${element.name}`);
      console.log(`\tMetadata:`);
      console.log(`\t\tType Url: ${element.metadata.typeUrl}`);
      console.log(`\tDone: ${element.done}`);
    }
  }
  undeployModel();
  // [END automl_vision_object_detection_undeploy_model]
}
main(...process.argv.slice(2));
