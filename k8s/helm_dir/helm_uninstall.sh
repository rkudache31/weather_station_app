helm uninstall  back-devlopment  --namespace ingress-nginx
helm uninstall  back-service  --namespace ingress-nginx
helm uninstall  front-service  --namespace ingress-nginx
helm uninstall  front-app  --namespace ingress-nginx

