import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Plugin xử lý HTML Partials
 * Cho phép nhúng partials từ src/partials/ vào index.html bằng cú pháp:
 * <load src="src/partials/header.html" /> hoặc <!-- include: src/partials/header.html -->
 * Đồng thời tự động Hot Reload khi sửa các file partials!
 */
function htmlPartialsPlugin() {
  const replacePartials = (html) => {
    let result = html;
    
    // Hỗ trợ <load src="..." /> hoặc <include src="..." />
    result = result.replace(/<(?:load|include)\s+src="([^"]+)"\s*(?:\/>|><\/(?:load|include)>)/gi, (match, partialPath) => {
      const fullPath = path.resolve(process.cwd(), partialPath.trim());
      if (fs.existsSync(fullPath)) {
        return replacePartials(fs.readFileSync(fullPath, 'utf-8'));
      }
      return `<!-- Không tìm thấy partial: ${partialPath} -->`;
    });

    // Hỗ trợ <!-- include: src/partials/... -->
    result = result.replace(/<!--\s*include:\s*([^\s]+)\s*-->/gi, (match, partialPath) => {
      const fullPath = path.resolve(process.cwd(), partialPath.trim());
      if (fs.existsSync(fullPath)) {
        return replacePartials(fs.readFileSync(fullPath, 'utf-8'));
      }
      return `<!-- Không tìm thấy partial: ${partialPath} -->`;
    });

    return result;
  };

  return {
    name: 'vite-plugin-html-partials',
    transformIndexHtml(html) {
      return replacePartials(html);
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('partials') && file.endsWith('.html')) {
        server.ws.send({
          type: 'full-reload',
          path: '*'
        });
      }
    }
  };
}

export default defineConfig({
  // base: './' để khi build ra thư mục dist/ có thể deploy lên GitHub Pages ở bất kỳ subpath nào
  base: './',
  plugins: [htmlPartialsPlugin()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
