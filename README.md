# COMP6573001-2021-MARC0
##### This is the greatest COMP6573001-2021-MARC0 of all time

### Description
blebleblebleble

### Team members:
- Aric Hernando - 2301890314 (Aric-prog)
- Bently Edyson - 2301894590 (bentlyedyson)
- Bryan Putra S. - 2301890983 (BryanPutra)
- Jason Christian - 2301891714 (nakamarusun)

### Info:
The docker compose file is advised not to be used to run the container, as now kubernetes is used.
So, docker-compose is only for building the image. Many of the kubernetes yaml
files are generated automatically from the docker-compose.yml file using
`kompose`. After generating the kubernetes files, we modify it to suit our
needs.

**all of marc0 resources use the marc0-namespace namespace.**

### Usage:
1. Create all the images from all the dockerfiles so its available locally
```bash
docker compose build
```

2. Apply relevant environment variables (see `kubernetes/configmap.yaml.template`)
```bash
envsubst < kubernetes/configmap.yaml.template > kubernetes/configmap.yaml
```

3. Apply all the yamls to your kubernetes cluster
```bash
kubectl apply -f ./kubernetes
```

4. Create a secret for the GCP service accounts
```bash
kubectl create secret generic streamer-key -n=marc0-namespace --from-file=stream-key.json=<PATH-TO-SERVICE-ACCOUNT-KEY-IN-PC>.json
```
*To see how this comes into action, look at `kubernetes/stream-handler-deployment.yaml`

5. Access your deployment by getting the external IP from the `nginx-loadbalancer.yaml` with this command
```bash
kubectl get services --output wide
```

### Notes:
When pushing new deployments, if the yaml file does not change, it will not
update the existing pods. To property do this automatically, one way to do it
is to have multiple repositories for each images. Or, one can detect automatically
which image changes. Another way is to change the versioning manually in the yamls
and docker compose file
(Which is done by changing the build number at the end).

### Recommendations:
- Live transcoding from .flv format to .mp4 in the streamer pod
- Need a way to `kubectl delete` without deleting the namespace
- Use Ingress instead of nginx
- I think nginx-rtmp is able to use ? url queries. Look on this later
