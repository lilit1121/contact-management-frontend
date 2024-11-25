import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'home', component: () => import('../views/ContactList.vue') },
  { path: '/add', name: 'add', component: () => import('../views/AddContact.vue') },
  { path: '/edit/:id', name: 'edit', component: () => import('../views/EditContact.vue') },
  { path: '/view/:id', name: 'view', component: () => import('../views/ViewContact.vue') },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
