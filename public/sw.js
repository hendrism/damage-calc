diff --git a//dev/null b/public/sw.js
index 0000000000000000000000000000000000000000..f0ef6aea35e55772acf98eccf83cd74b17961f48 100644
--- a//dev/null
+++ b/public/sw.js
@@ -0,0 +1,15 @@
+self.addEventListener('install', event => {
+  event.waitUntil(
+    caches.open('damage-calc-v1').then(cache => cache.addAll([
+      '/',
+      '/index.html',
+      '/manifest.webmanifest'
+    ]))
+  );
+});
+
+self.addEventListener('fetch', event => {
+  event.respondWith(
+    caches.match(event.request).then(response => response || fetch(event.request))
+  );
+});
