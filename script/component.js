/**
 * Created by loveyu on 2015/4/1.
 * 基本的组件
 */
Vue.component('base-login-form', {__require: 'base/login.html'});
Vue.component('base-loading', {__require: 'base/loading.html'});
Vue.component('base-page-menu', {__require: 'base/page_menu.html'});
Vue.component('base-error', {__require: 'base/error.html'});
Vue.component('quiz-item', {__require: 'manager_quiz/quiz_item.html'});
Vue.component('answer-item', {__require: 'quiz/answer_item.html'});
Vue.component('course-search', {__require: 'course/search.html'});
Vue.component('test-list', {__require: 'quiz/test_list.html'});

/**
 * 评价组件
 */
Vue.component('review-review', {__require: 'review/review.html'});
Vue.component('review-list', {__require: 'review/list.html'});