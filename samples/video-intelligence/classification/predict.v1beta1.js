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
async function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  modelId = 'YOUR_MODEL_ID',
  inputUri = 'GCS_PATH',
  outputUriPrefix = 'GCS_DIRECTORY_PATH'
) {
  // [START automl_video_intelligence_classification_predict]
  const automl = require('@google-cloud/automl');

  // Create client for prediction service.
  const client = new automl.v1beta1.PredictionServiceClient();

  /**
   * Demonstrates using the AutoML client to classify the video intelligence
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const modelId = '[MODEL_ID]' e.g., "IOD2122286140026257408";
  // const inputUri = '[GCS_PATH]' e.g., "gs://<bucket-name>/<csv file>",
  // `the GCS bucket path of csv file which contains path of the video
  // to be classified.`;
  // const outputUriPrefix = '[GCS_DIRECTORY_PATH]'
  // e.g., "gs://<bucket-name>/<folder>",
  // `the output GCS bucket folder path which contains one csv file and
  // json file for each video classification.`;

  // Get the full path of the model.
  const modelFullId = client.modelPath(projectId, computeRegion, modelId);

  // Set the input URI
  const inputConfig = {
    gcsSource: {
      inputUris: [inputUri],
    },
  };

  // Set the output URI
  const outputUri = outputUriPrefix;
  const outputConfig = {
    gcsDestination: {
      outputUriPrefix: outputUri,
    },
  };

  // Get the latest state of a long-running operation.
  client
    .batchPredict({
      name: modelFullId,
      inputConfig: inputConfig,
      outputConfig: outputConfig,
    })
    .then(responses => {
      const response = responses[1];
      console.log(`Operation name: ${response.name}`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_video_intelligence_classification_predict]
}
main(...process.argv.slice(2)).catch(console.error());
