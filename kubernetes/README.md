# Kubernetes notes:

### Yaml
.yaml files are configuration files applied to the control plane. The control
plane will read the configuration and applies them to all the nodes that it
controls to match the desired state written in the files. The configuration files
controls kubernetes object(s) and their state.

### Objects / Resources
Kubernetes objects controls the state of a pod, what a controller should do,
should it expose network to others, how much should the pod replicates, should
a pod replicate to meet resource demand, etc. There are many types of objects
such as Deployments, Services, StatefulSets, etc.

### Deployments
So deployments are the apps itself, being build from a docker image.
`metadata.labels` are used to identify apps for example in kubectl.
spec is the actual specifications for the app deployment.
`spec.selector.matchLabels` and `spec.template.metadata.labels` are used to
identify the deployments so that it can be reached by kubernetes Service.
`spec.template.spec` defines how the pod should be built from the image, volumes,
and what ports should be open.

Deployments are basically a higher level concepts of a ReplicaSets. It is
recommended to just use deployments because it already handles replicas unless
need custom update orchestration

### Service
https://www.vmware.com/topics/glossary/content/kubernetes-services.html
https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/

The service yaml file defines if the app deployment should be able to connect
to other deployments. Since pods get killed and made all the time, the ip
address changes all the time too. Using services, we can connect bteween
deployments by referring to their names in the selector.

If the service is already defined, then we can access the service from other
pods by their service name (DNS Method).

### StatefulSets
For stateful pods such as ones that contains redis, StatefulSet must be used
instead of a deployment which is stateless. This is not used in our application
because we use firebase.

### HorizontalPodScaling
Allows us to add more pods if a pod has too much resource usage to match demand.
Different from replicas, because replicas are how many fixed amounts of pods
should exist.

### Namespace
Namespaces are used to group up resources together.

### Epic references
https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app#cloud-shell
https://cloud.google.com/kubernetes-engine/docs/tutorials/gitops-cloud-build#shell
https://cloud.google.com/kubernetes-engine/docs/tutorials/upgrading-stateful-workload
https://k8syaml.com/

*Confused env:
https://stackoverflow.com/questions/56003777/how-to-pass-environment-variable-in-kubectl-deployment
https://humanitec.com/blog/handling-environment-variables-with-kubernetes

### Nice commands

docker compose build
kubectl apply -f kubernetes/
kubectl delete -f kubernetes/
kubectl edit