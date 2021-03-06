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

const assert = require('assert');

const automlModule = require('../src');

const FAKE_STATUS_CODE = 1;
const error = new Error();
error.code = FAKE_STATUS_CODE;

describe('AutoMlClient', () => {
  it('has servicePath', () => {
    const servicePath = automlModule.v1.AutoMlClient.servicePath;
    assert(servicePath);
  });

  it('has apiEndpoint', () => {
    const apiEndpoint = automlModule.v1.AutoMlClient.apiEndpoint;
    assert(apiEndpoint);
  });

  it('has port', () => {
    const port = automlModule.v1.AutoMlClient.port;
    assert(port);
    assert(typeof port === 'number');
  });

  it('should create a client with no options', () => {
    const client = new automlModule.v1.AutoMlClient();
    assert(client);
  });

  it('should create a client with gRPC fallback', () => {
    const client = new automlModule.v1.AutoMlClient({fallback: true});
    assert(client);
  });

  describe('createDataset', function() {
    it('invokes createDataset without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const dataset = {};
      const request = {
        parent: formattedParent,
        dataset: dataset,
      };

      // Mock response
      const name = 'name3373707';
      const displayName = 'displayName1615086568';
      const description = 'description-1724546052';
      const exampleCount = 1517063674;
      const etag = 'etag3123477';
      const expectedResponse = {
        name: name,
        displayName: displayName,
        description: description,
        exampleCount: exampleCount,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.createDataset = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .createDataset(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes createDataset with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const dataset = {};
      const request = {
        parent: formattedParent,
        dataset: dataset,
      };

      // Mock Grpc layer
      client._innerApiCalls.createDataset = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .createDataset(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.createDataset.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.createDataset.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('updateDataset', () => {
    it('invokes updateDataset without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const dataset = {};
      const updateMask = {};
      const request = {
        dataset: dataset,
        updateMask: updateMask,
      };

      // Mock response
      const name = 'name3373707';
      const displayName = 'displayName1615086568';
      const description = 'description-1724546052';
      const exampleCount = 1517063674;
      const etag = 'etag3123477';
      const expectedResponse = {
        name: name,
        displayName: displayName,
        description: description,
        exampleCount: exampleCount,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateDataset = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.updateDataset(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes updateDataset with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const dataset = {};
      const updateMask = {};
      const request = {
        dataset: dataset,
        updateMask: updateMask,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateDataset = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.updateDataset(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('getDataset', () => {
    it('invokes getDataset without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const displayName = 'displayName1615086568';
      const description = 'description-1724546052';
      const exampleCount = 1517063674;
      const etag = 'etag3123477';
      const expectedResponse = {
        name: name2,
        displayName: displayName,
        description: description,
        exampleCount: exampleCount,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.getDataset = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getDataset(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getDataset with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getDataset = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getDataset(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('listDatasets', () => {
    it('invokes listDatasets without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const request = {
        parent: formattedParent,
      };

      // Mock response
      const nextPageToken = '';
      const datasetsElement = {};
      const datasets = [datasetsElement];
      const expectedResponse = {
        nextPageToken: nextPageToken,
        datasets: datasets,
      };

      // Mock Grpc layer
      client._innerApiCalls.listDatasets = (
        actualRequest,
        options,
        callback
      ) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse.datasets);
      };

      client.listDatasets(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse.datasets);
        done();
      });
    });

    it('invokes listDatasets with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listDatasets = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listDatasets(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('deleteDataset', function() {
    it('invokes deleteDataset without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.deleteDataset = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .deleteDataset(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes deleteDataset with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteDataset = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .deleteDataset(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.deleteDataset.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.deleteDataset.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('importData', function() {
    it('invokes importData without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const inputConfig = {};
      const request = {
        name: formattedName,
        inputConfig: inputConfig,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.importData = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .importData(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes importData with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const inputConfig = {};
      const request = {
        name: formattedName,
        inputConfig: inputConfig,
      };

      // Mock Grpc layer
      client._innerApiCalls.importData = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .importData(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.importData.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.importData.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('exportData', function() {
    it('invokes exportData without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const outputConfig = {};
      const request = {
        name: formattedName,
        outputConfig: outputConfig,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.exportData = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .exportData(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes exportData with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.datasetPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]'
      );
      const outputConfig = {};
      const request = {
        name: formattedName,
        outputConfig: outputConfig,
      };

      // Mock Grpc layer
      client._innerApiCalls.exportData = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .exportData(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.exportData.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.exportData.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('getAnnotationSpec', () => {
    it('invokes getAnnotationSpec without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.annotationSpecPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]',
        '[ANNOTATION_SPEC]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const displayName = 'displayName1615086568';
      const exampleCount = 1517063674;
      const expectedResponse = {
        name: name2,
        displayName: displayName,
        exampleCount: exampleCount,
      };

      // Mock Grpc layer
      client._innerApiCalls.getAnnotationSpec = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getAnnotationSpec(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getAnnotationSpec with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.annotationSpecPath(
        '[PROJECT]',
        '[LOCATION]',
        '[DATASET]',
        '[ANNOTATION_SPEC]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getAnnotationSpec = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getAnnotationSpec(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('createModel', function() {
    it('invokes createModel without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const model = {};
      const request = {
        parent: formattedParent,
        model: model,
      };

      // Mock response
      const name = 'name3373707';
      const displayName = 'displayName1615086568';
      const datasetId = 'datasetId-2115646910';
      const etag = 'etag3123477';
      const expectedResponse = {
        name: name,
        displayName: displayName,
        datasetId: datasetId,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.createModel = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .createModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes createModel with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const model = {};
      const request = {
        parent: formattedParent,
        model: model,
      };

      // Mock Grpc layer
      client._innerApiCalls.createModel = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .createModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.createModel.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.createModel.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('getModel', () => {
    it('invokes getModel without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const displayName = 'displayName1615086568';
      const datasetId = 'datasetId-2115646910';
      const etag = 'etag3123477';
      const expectedResponse = {
        name: name2,
        displayName: displayName,
        datasetId: datasetId,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.getModel = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getModel(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getModel with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getModel = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getModel(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('updateModel', () => {
    it('invokes updateModel without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const model = {};
      const updateMask = {};
      const request = {
        model: model,
        updateMask: updateMask,
      };

      // Mock response
      const name = 'name3373707';
      const displayName = 'displayName1615086568';
      const datasetId = 'datasetId-2115646910';
      const etag = 'etag3123477';
      const expectedResponse = {
        name: name,
        displayName: displayName,
        datasetId: datasetId,
        etag: etag,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateModel = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.updateModel(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes updateModel with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const model = {};
      const updateMask = {};
      const request = {
        model: model,
        updateMask: updateMask,
      };

      // Mock Grpc layer
      client._innerApiCalls.updateModel = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.updateModel(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('listModels', () => {
    it('invokes listModels without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const request = {
        parent: formattedParent,
      };

      // Mock response
      const nextPageToken = '';
      const modelElement = {};
      const model = [modelElement];
      const expectedResponse = {
        nextPageToken: nextPageToken,
        model: model,
      };

      // Mock Grpc layer
      client._innerApiCalls.listModels = (actualRequest, options, callback) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse.model);
      };

      client.listModels(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse.model);
        done();
      });
    });

    it('invokes listModels with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.locationPath('[PROJECT]', '[LOCATION]');
      const request = {
        parent: formattedParent,
      };

      // Mock Grpc layer
      client._innerApiCalls.listModels = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listModels(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('deleteModel', function() {
    it('invokes deleteModel without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.deleteModel = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .deleteModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes deleteModel with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deleteModel = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .deleteModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.deleteModel.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.deleteModel.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('deployModel', function() {
    it('invokes deployModel without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.deployModel = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .deployModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes deployModel with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.deployModel = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .deployModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.deployModel.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.deployModel.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('undeployModel', function() {
    it('invokes undeployModel without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.undeployModel = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .undeployModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes undeployModel with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.undeployModel = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .undeployModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.undeployModel.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.undeployModel.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('exportModel', function() {
    it('invokes exportModel without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const outputConfig = {};
      const request = {
        name: formattedName,
        outputConfig: outputConfig,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.exportModel = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .exportModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes exportModel with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const outputConfig = {};
      const request = {
        name: formattedName,
        outputConfig: outputConfig,
      };

      // Mock Grpc layer
      client._innerApiCalls.exportModel = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .exportModel(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.exportModel.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.exportModel.metadataDecoder instanceof
          Function
      );
    });
  });

  describe('getModelEvaluation', () => {
    it('invokes getModelEvaluation without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelEvaluationPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]',
        '[MODEL_EVALUATION]'
      );
      const request = {
        name: formattedName,
      };

      // Mock response
      const name2 = 'name2-1052831874';
      const annotationSpecId = 'annotationSpecId60690191';
      const displayName = 'displayName1615086568';
      const evaluatedExampleCount = 277565350;
      const expectedResponse = {
        name: name2,
        annotationSpecId: annotationSpecId,
        displayName: displayName,
        evaluatedExampleCount: evaluatedExampleCount,
      };

      // Mock Grpc layer
      client._innerApiCalls.getModelEvaluation = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.getModelEvaluation(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes getModelEvaluation with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelEvaluationPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]',
        '[MODEL_EVALUATION]'
      );
      const request = {
        name: formattedName,
      };

      // Mock Grpc layer
      client._innerApiCalls.getModelEvaluation = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.getModelEvaluation(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('listModelEvaluations', () => {
    it('invokes listModelEvaluations without error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const filter = 'filter-1274492040';
      const request = {
        parent: formattedParent,
        filter: filter,
      };

      // Mock response
      const nextPageToken = '';
      const modelEvaluationElement = {};
      const modelEvaluation = [modelEvaluationElement];
      const expectedResponse = {
        nextPageToken: nextPageToken,
        modelEvaluation: modelEvaluation,
      };

      // Mock Grpc layer
      client._innerApiCalls.listModelEvaluations = (
        actualRequest,
        options,
        callback
      ) => {
        assert.deepStrictEqual(actualRequest, request);
        callback(null, expectedResponse.modelEvaluation);
      };

      client.listModelEvaluations(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse.modelEvaluation);
        done();
      });
    });

    it('invokes listModelEvaluations with error', done => {
      const client = new automlModule.v1.AutoMlClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedParent = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const filter = 'filter-1274492040';
      const request = {
        parent: formattedParent,
        filter: filter,
      };

      // Mock Grpc layer
      client._innerApiCalls.listModelEvaluations = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.listModelEvaluations(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
});
describe('PredictionServiceClient', () => {
  it('has servicePath', () => {
    const servicePath = automlModule.v1.PredictionServiceClient.servicePath;
    assert(servicePath);
  });

  it('has apiEndpoint', () => {
    const apiEndpoint = automlModule.v1.PredictionServiceClient.apiEndpoint;
    assert(apiEndpoint);
  });

  it('has port', () => {
    const port = automlModule.v1.PredictionServiceClient.port;
    assert(port);
    assert(typeof port === 'number');
  });

  it('should create a client with no options', () => {
    const client = new automlModule.v1.PredictionServiceClient();
    assert(client);
  });

  it('should create a client with gRPC fallback', () => {
    const client = new automlModule.v1.PredictionServiceClient({
      fallback: true,
    });
    assert(client);
  });

  describe('predict', () => {
    it('invokes predict without error', done => {
      const client = new automlModule.v1.PredictionServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const payload = {};
      const request = {
        name: formattedName,
        payload: payload,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.predict = mockSimpleGrpcMethod(
        request,
        expectedResponse
      );

      client.predict(request, (err, response) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes predict with error', done => {
      const client = new automlModule.v1.PredictionServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const payload = {};
      const request = {
        name: formattedName,
        payload: payload,
      };

      // Mock Grpc layer
      client._innerApiCalls.predict = mockSimpleGrpcMethod(
        request,
        null,
        error
      );

      client.predict(request, (err, response) => {
        assert(err instanceof Error);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });

  describe('batchPredict', function() {
    it('invokes batchPredict without error', done => {
      const client = new automlModule.v1.PredictionServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const inputConfig = {};
      const outputConfig = {};
      const request = {
        name: formattedName,
        inputConfig: inputConfig,
        outputConfig: outputConfig,
      };

      // Mock response
      const expectedResponse = {};

      // Mock Grpc layer
      client._innerApiCalls.batchPredict = mockLongRunningGrpcMethod(
        request,
        expectedResponse
      );

      client
        .batchPredict(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(responses => {
          assert.deepStrictEqual(responses[0], expectedResponse);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('invokes batchPredict with error', done => {
      const client = new automlModule.v1.PredictionServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });

      // Mock request
      const formattedName = client.modelPath(
        '[PROJECT]',
        '[LOCATION]',
        '[MODEL]'
      );
      const inputConfig = {};
      const outputConfig = {};
      const request = {
        name: formattedName,
        inputConfig: inputConfig,
        outputConfig: outputConfig,
      };

      // Mock Grpc layer
      client._innerApiCalls.batchPredict = mockLongRunningGrpcMethod(
        request,
        null,
        error
      );

      client
        .batchPredict(request)
        .then(responses => {
          const operation = responses[0];
          return operation.promise();
        })
        .then(() => {
          assert.fail();
        })
        .catch(err => {
          assert(err instanceof Error);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
    });

    it('has longrunning decoder functions', () => {
      const client = new automlModule.v1.PredictionServiceClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      assert(
        client._descriptors.longrunning.batchPredict.responseDecoder instanceof
          Function
      );
      assert(
        client._descriptors.longrunning.batchPredict.metadataDecoder instanceof
          Function
      );
    });
  });
});

function mockSimpleGrpcMethod(expectedRequest, response, error) {
  return function(actualRequest, options, callback) {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    if (error) {
      callback(error);
    } else if (response) {
      callback(null, response);
    } else {
      callback(null);
    }
  };
}

function mockLongRunningGrpcMethod(expectedRequest, response, error) {
  return request => {
    assert.deepStrictEqual(request, expectedRequest);
    const mockOperation = {
      promise: function() {
        return new Promise((resolve, reject) => {
          if (error) {
            reject(error);
          } else {
            resolve([response]);
          }
        });
      },
    };
    return Promise.resolve([mockOperation]);
  };
}
