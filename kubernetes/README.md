# Kubernetes notes:

### Deployments
So deployments are the apps itself, being build from a docker image.
`metadata.labels` are used to identify apps for example in kubectl.
spec is the actual specifications for the app deployment.
`spec.selector.matchLabels` and `spec.template.metadata.labels` are used to
identify the deployments so that it can be reached by kubernetes Service.
`spec.template.spec` defines how the pod should be built from the image, volumes,
and what ports should be open.

### Service
https://www.vmware.com/topics/glossary/content/kubernetes-services.html
https://kubernetes.io/docs/concepts/services-networking/connect-applications-service/

The service yaml file defines if the app deployment should be able to connect
to other deployments. Since pods get killed and made all the time, the ip
address changes all the time too. Using services, we can connect bteween
deployments by referring to their names in the selector.

If the service is already defined, then we can access the service from other
pods by their service name (DNS Method).