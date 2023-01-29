import { publish } from 'gh-pages';

publish(
 'build', // path to public directory
 {
  branch: 'main',
  repo: 'https://github.com/woojung3/woojung3.github.io.git', // Update to point to your repository
  user: {
   name: 'Jinwoo Lee', // update to use your name
   email: 'woojung3@postech.ac.kr' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);
