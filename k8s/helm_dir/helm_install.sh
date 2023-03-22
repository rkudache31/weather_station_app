read -p "install/upgrade:- " cmdout

helm $cmdout --debug --dry-run back-devlopment ./backend_deployment --namespace ingress-nginx
helm $cmdout  back-devlopment ./backend_deployment --namespace ingress-nginx
helm $cmdout  --debug --dry-run back-service ./back-service --namespace ingress-nginx
helm $cmdout  back-service ./back-service --namespace ingress-nginx
helm $cmdout --debug --dry-run front-service ./front-service --namespace ingress-nginx
helm $cmdout  front-service ./front-service --namespace ingress-nginx
helm $cmdout --debug --dry-run front-app ./frontend_deployment --namespace ingress-nginx
helm $cmdout  front-app ./frontend_deployment --namespace ingress-nginx
helm $cmdout  ingress ./ingress --namespace ingress-nginx
