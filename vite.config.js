import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:         'index.html',
        offline:      'offline/index.html',
        game:         'offline/game.html',
        play:         'offline/play.html',
        zentrixHost:  'zentrix/host.html',
        zentrixJoin:  'zentrix/join.html',
      }
    }
  }
})
