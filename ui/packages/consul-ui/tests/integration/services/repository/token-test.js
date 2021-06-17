import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import repo from 'consul-ui/tests/helpers/repo';
import { createPolicies } from 'consul-ui/tests/helpers/normalizers';

const NAME = 'token';

module(`Integration | Service | ${NAME}`, function (hooks) {
  setupTest(hooks);
  skip('clone returns the correct data for the clone endpoint');
  const dc = 'dc-1';
  const id = 'token-id';
  const undefinedNspace = 'default';
  [undefinedNspace, 'team-1', undefined].forEach((nspace) => {
    skip(`findByDatacenter returns the correct data for list endpoint when nspace is ${nspace}`, function (assert) {
      return repo(
        'Token',
        'findAllByDatacenter',
        this.owner.lookup(`service:repository/${NAME}`),
        function retrieveStub(stub) {
          return stub(
            `/v1/acl/tokens?dc=${dc}${typeof nspace !== 'undefined' ? `&ns=${nspace}` : ``}`,
            {
              CONSUL_TOKEN_COUNT: '100',
            }
          );
        },
        function performTest(service) {
          return service.findAllByDatacenter({ dc, ns: nspace || undefinedNspace });
        },
        function performAssertion(actual, expected) {
          assert.deepEqual(
            actual,
            expected(function (payload) {
              return payload.map(function (item) {
                return Object.assign({}, item, {
                  Datacenter: dc,
                  CreateTime: new Date(item.CreateTime),
                  Namespace: item.Namespace || undefinedNspace,
                  uid: `["${item.Namespace || undefinedNspace}","${dc}","${item.AccessorID}"]`,
                  Policies: createPolicies(item),
                });
              });
            })
          );
        }
      );
    });
    skip(`findBySlug returns the correct data for item endpoint when nspace is ${nspace}`, function (assert) {
      return repo(
        'Token',
        'findBySlug',
        this.owner.lookup(`service:repository/${NAME}`),
        function retrieveStub(stub) {
          return stub(
            `/v1/acl/token/${id}?dc=${dc}${typeof nspace !== 'undefined' ? `&ns=${nspace}` : ``}`
          );
        },
        function performTest(service) {
          return service.findBySlug({ id, dc, ns: nspace || undefinedNspace });
        },
        function performAssertion(actual, expected) {
          assert.deepEqual(
            actual,
            expected(function (payload) {
              const item = payload;
              return Object.assign({}, item, {
                Datacenter: dc,
                CreateTime: new Date(item.CreateTime),
                Namespace: item.Namespace || undefinedNspace,
                uid: `["${item.Namespace || undefinedNspace}","${dc}","${item.AccessorID}"]`,
                meta: {
                  cacheControl: undefined,
                  cursor: undefined,
                  dc: dc,
                  nspace: item.Namespace || undefinedNspace,
                },
                Policies: createPolicies(item),
              });
            })
          );
        }
      );
    });
    skip(`findByPolicy returns the correct data when nspace is ${nspace}`, function (assert) {
      const policy = 'policy-1';
      return repo(
        'Token',
        'findByPolicy',
        this.subject(),
        function retrieveStub(stub) {
          return stub(
            `/v1/acl/tokens?dc=${dc}&policy=${policy}${
              typeof nspace !== 'undefined' ? `&ns=${nspace}` : ``
            }`,
            {
              CONSUL_TOKEN_COUNT: '100',
            }
          );
        },
        function performTest(service) {
          return service.findByPolicy({ id: policy, dc, ns: nspace || undefinedNspace });
        },
        function performAssertion(actual, expected) {
          assert.deepEqual(
            actual,
            expected(function (payload) {
              return payload.map(function (item) {
                return Object.assign({}, item, {
                  Datacenter: dc,
                  CreateTime: new Date(item.CreateTime),
                  Namespace: item.Namespace || undefinedNspace,
                  uid: `["${item.Namespace || undefinedNspace}","${dc}","${item.AccessorID}"]`,
                  Policies: createPolicies(item),
                });
              });
            })
          );
        }
      );
    });
    skip(`findByRole returns the correct data when nspace is ${nspace}`, function (assert) {
      const role = 'role-1';
      return repo(
        'Token',
        'findByPolicy',
        this.subject(),
        function retrieveStub(stub) {
          return stub(
            `/v1/acl/tokens?dc=${dc}&role=${role}${
              typeof nspace !== 'undefined' ? `&ns=${nspace}` : ``
            }`,
            {
              CONSUL_TOKEN_COUNT: '100',
            }
          );
        },
        function performTest(service) {
          return service.findByRole({ id: role, dc, ns: nspace || undefinedNspace });
        },
        function performAssertion(actual, expected) {
          assert.deepEqual(
            actual,
            expected(function (payload) {
              return payload.map(function (item) {
                return Object.assign({}, item, {
                  Datacenter: dc,
                  CreateTime: new Date(item.CreateTime),
                  Namespace: item.Namespace || undefinedNspace,
                  uid: `["${item.Namespace || undefinedNspace}","${dc}","${item.AccessorID}"]`,
                  Policies: createPolicies(item),
                });
              });
            })
          );
        }
      );
    });
  });
});
