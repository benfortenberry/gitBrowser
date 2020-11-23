import Vue from "vue";
import { expect } from "chai";
import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import RepoDetail from "@/components/RepoDetail.vue";
import VueRouter from "vue-router";
import sinon from "sinon";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

const mockResponse = {
  data: [
    {
      id: 1,
      commit: {
        id: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
        message: "Fix all the bugs",
        timestamp: "2016-10-10T00:00:00Z",
        author: {
          name: "Monalisa Octocat",
          email: "mona@github.com"
        },
        committer: {
          name: "Monalisa Octocat",
          email: "mona@github.com"
        }
      },
    },
    {
      id: 2,
      commit: {
        id: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
        message: "Fix all the bugs",
        timestamp: "2016-10-10T00:00:00Z",
        author: {
          name: "Monalisa Octocat",
          email: "mona@github.com"
        },
        committer: {
          name: "Monalisa Octocat",
          email: "mona@github.com"
        }
      }
    }
  ]
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);

localVue.filter("truncate", function () {
  return '...'
});


const router = new VueRouter();

describe("RepoDetail.vue", () => {
  let actions;
  let store = new Vuex.Store({});

  beforeEach(() => {
    actions = {
      loadCommits: sinon.stub().returns(Promise.resolve(mockResponse))
    };
    store = new Vuex.Store({
      state: { commits: mockResponse },
      actions
    });
  });

  it("renders repo name when passed", async () => {
    const repo = "american-utopia";
    const wrapper = shallowMount(RepoDetail, {
      propsData: { repo },
      store,
      router,
      localVue
    });

    await Vue.nextTick()
    expect(wrapper.text()).to.include(repo);
  });

  it("renders commit list when passed", async () => {
    const repo = "american-utopia";
    const wrapper = shallowMount(RepoDetail, {
      propsData: { repo },
      store,
      router,
      localVue
    });

    await Vue.nextTick()
    const listItems = wrapper.findAll(".commitItem");

    expect(listItems.length).to.equal(mockResponse.data.length);
  });
});
