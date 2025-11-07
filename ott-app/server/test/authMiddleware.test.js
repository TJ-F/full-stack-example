import assert from 'assert';
import verifyToken from '../middleware/auth.js';
import { generateTestToken } from './jwtSetup.js';

const token = generateTestToken(false);

// Simulate Express req/res/next
function createMockReqRes(token) {
  const req = {
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  const res = {
    _statusCode: 0,
    _jsonResponse: null,

    status(code) {
      this._statusCode = code;
      return this;
    },

    json(obj) {
      this._jsonResponse = obj;
    },

    getStatusCode() {
      return this._statusCode;
    },

    getJsonResponse() {
      return this._jsonResponse;
    },
  };

  let nextCalled = false;

  const next = () => {
    nextCalled = true;
  };

  return { req, res, next, getStatusCode: () => res.getStatusCode(), getJsonResponse: () => res.getJsonResponse(), nextCalled: () => nextCalled };
}


describe('verifyToken middleware', () => {

  it('should deny access when no token is provided', () => {
    const { req, res, next, getStatusCode, getJsonResponse, nextCalled } = createMockReqRes();

    verifyToken(req, res, next);

    assert.equal(getStatusCode(), 403);
    assert.deepEqual(getJsonResponse(), { message: 'No token provided or invalid format' });
    assert.equal(nextCalled(), false);
  });


  it('should deny access with invalid token', () => {
    const { req, res, next, getStatusCode, getJsonResponse, nextCalled } = createMockReqRes('badtoken');

    verifyToken(req, res, next);

    assert.equal(getStatusCode(), 403);
    assert.deepEqual(getJsonResponse(), { message: 'Failed to authenticate token' });
    assert.equal(nextCalled(), false);
  });

  it('should allow access with valid token', () => {
    const { req, res, next, getStatusCode, getJsonResponse, nextCalled } = createMockReqRes(token);

    verifyToken(req, res, next);

    assert.equal(nextCalled(), true);
    assert.equal(req.customer_id, 1);
    assert.equal(getStatusCode(), 0);
    assert.equal(getJsonResponse(), null);
  });
});
