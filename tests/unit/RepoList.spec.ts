import Vue from "vue";
import { expect } from "chai";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import RepoList from "@/components/RepoList.vue";
import sinon from "sinon";
import VueRouter from "vue-router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

const mockRepoResponse = {
  data: [
    {
      id: 1296269,
      name: "Hello-World",
      owner: {
        login: "octocat",
        id: 1,
        url: "https://api.github.com/users/octocat",

        type: "User"
      },
      private: false,
      description: "This your first repo!",
      fork: false,
      url: "https://api.github.com/repos/octocat/Hello-World",
      homepage: "https://github.com",
      language: null,
      size: 108,
      topics: ["octocat", "atom", "electron", "api"],
      archived: false,
      disabled: false,
      visibility: "public",
      pushed_at: "2011-01-26T19:06:43Z",
      created_at: "2011-01-26T19:01:12Z",
      updated_at: "2011-01-26T19:14:43Z",
      permissions: {
        admin: false,
        push: false,
        pull: true
      },
      delete_branch_on_merge: true,
      subscribers_count: 42,
      network_count: 0,
      license: {
        key: "mit",
        name: "MIT License",
        spdx_id: "MIT",
        url: "https://api.github.com/licenses/mit",
        node_id: "MDc6TGljZW5zZW1pdA=="
      }
    }
  ]
};

const mockOrgResponse = {
  data: {
    login: "github",
    id: 1,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjE=",
    url: "https://api.github.com/orgs/github",
    repos_url: "https://api.github.com/orgs/github/repos",
    events_url: "https://api.github.com/orgs/github/events",
    hooks_url: "https://api.github.com/orgs/github/hooks",
    issues_url: "https://api.github.com/orgs/github/issues",
    members_url: "https://api.github.com/orgs/github/members{/member}",
    public_members_url:
      "https://api.github.com/orgs/github/public_members{/member}",
    avatar_url: "https://github.com/images/error/octocat_happy.gif",
    description: "A great organization",
    name: "github",
    company: "GitHub",
    blog: "https://github.com/blog",
    location: "San Francisco",
    email: "octocat@github.com",
    twitter_username: "github",
    is_verified: true,
    has_organization_projects: true,
    has_repository_projects: true,
    public_repos: 2,
    public_gists: 1,
    followers: 20,
    following: 0,
    html_url: "https://github.com/octocat",
    created_at: "2008-01-14T04:33:35Z",
    updated_at: "2014-03-03T18:58:10Z",
    type: "Organization",
    total_private_repos: 100,
    owned_private_repos: 100,
    private_gists: 81,
    disk_usage: 10000,
    collaborators: 8,
    billing_email: "mona@github.com",
    plan: {
      name: "Medium",
      space: 400,
      private_repos: 20
    },
    default_repository_permission: "read",
    members_can_create_repositories: true,
    two_factor_requirement_enabled: true,
    members_allowed_repository_creation_type: "all",
    members_can_create_public_repositories: false,
    members_can_create_private_repositories: false,
    members_can_create_internal_repositories: false,
    members_can_create_pages: true
  }
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

localVue.filter("formatDate", function() {
  return "01/01/2001";
});

const router = new VueRouter();

describe("RepoList.vue", () => {
  let actions;
  let store = new Vuex.Store({});

  beforeEach(() => {
    actions = {
      loadRepos: sinon.stub().returns(Promise.resolve(mockRepoResponse)),
      loadOrg: sinon.stub().returns(Promise.resolve(mockOrgResponse))
    };
    store = new Vuex.Store({
      state: { repos: mockRepoResponse, org: mockOrgResponse },
      actions
    });
  });

  it("renders repo list when passed", async () => {
    const wrapper = shallowMount(RepoList, {
      store,
      router,
      localVue
    });

    await Vue.nextTick();
    const listItems = wrapper.findAll(".repoItem");

    expect(listItems.length).to.equal(mockRepoResponse.data.length);
  });
});
