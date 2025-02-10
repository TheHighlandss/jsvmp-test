import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'
import obfuscate from 'javascript-obfuscator'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    // minify: 'esbuild',
    legalComments: 'none',
  },
  build: {
    target: 'es2015'
  },
  plugins: [vue(),
        // {
        //   name: 'vite-plugin-javascript-obfuscator',
        //   enforce: 'post',
        //   apply: 'build',
        //   writeBundle (options, file) {
        //       const files = Object.keys(file)
        //       files.forEach(fileName => {
        //           if (fileName.endsWith('.js')) {
        //               const filePath = path.join(options.dir, fileName)
        //               const content = fs.readFileSync(filePath, 'utf-8')
        //               const obfuscationResult = obfuscate.obfuscate(content, {
        //                   compact: true,
        //                   deadCodeInjection: true,
        //                   deadCodeInjectionThreshold: 100,
        //               })
        //               fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode())
        //               console.log('done1');
        //           }
        //       })
        //   },
        // },
      {
        name: 'vite-plugin-javascript-vmp',
        enforce: 'post',
        apply: 'build',
        writeBundle (_, file) {
            const files = Object.keys(file)
            files.forEach(fileName => {
              if(fileName.endsWith('.js')){
                const filePath = path.join(_.dir, fileName)
                const content = fs.readFileSync(filePath).toString('utf-8')
                const url = 'https://jsvmp.net/business/vip'
                const formData = new FormData()
                // console.log(file[fileName]);
                // console.log('code',file[fileName].code.length);
                // console.log('content1',content.length);
                // console.log('content2',`${content}`.toString().length);
                // console.log('****************', content == JSON.stringify(content))
                // console.log('content3',JSON.stringify(content).length);
                // formData.append('jscode', JSON.stringify(content))
                // formData.append('jscode', content)
                formData.append('jscode', content.toString())
                formData.append('token', '79d6bfd7-003f-3485-82ed-733fe6479e8e')
                formData.append('debug', 0)
                formData.append('version', 'V1.4.7')

                fetch(url, {
                  method: 'POST',
                  body: formData
                }).then(response => response.json())
                    .then(data => {
                        if (+data.code === 1) {
                            console.log('***success***',filePath);
                            fs.writeFileSync(filePath, data.output.data)
                        } else {
                            console.log('***fail***',data);
                            throw new Error('jsvmp fetch error')
                        }
                    })
              }
            })
        },
    },
],
})
