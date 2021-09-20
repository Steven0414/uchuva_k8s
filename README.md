# Uchuva: Microservices implementation

Uchuva is a scientific web portal that allow users to create workflows and submit to HTCondor (Dagman), Slurm, OpenLava (LSF) and Torque (PBS). Is designed to be fast, flexible and simple.

This is a new microservices implementation that optimizes uchuva and make it deployable on Kubernetes!

Original project [GitHub repository](https://github.com/carlochess/uchuva).

## Installation

### Before

Verify that you have enabled virtualization.

#### In Linux

```bash
egrep --color 'vmx|svm' /proc/cpuinfo
```

### Dependencies

#### Install a hypervisor

If you don't have a hypervisor installed, please install one. [VirtualBox](https://www.virtualbox.org/wiki/Downloads), [KVM](https://www.linux-kvm.org/page/Main_Page).

#### Install kubectl

For kubectl installation through [snap](https://snapcraft.io/):

```bash
snap install kubectl --classic

kubectl version --client
```

For kubectl installation through apt:

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https gnupg2
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```

A complete installation guide for kubectl can be found at [Install and SetUp Kubectl](https://v1-18.docs.kubernetes.io/docs/tasks/tools/install-kubectl/).

#### Install Minikube

For local Kubernetes cluster.

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
sudo cp minikube /usr/local/bin && rm minikube
```

A complete installation guide for minikube can be found at [Install Minikube](https://v1-18.docs.kubernetes.io/es/docs/tasks/tools/install-minikube/).

#### Install Minikube Ingress Controller Add-On

```bash
chmod +x ./start_ingress
./start_ingress
```

### Deployment

For a complete deployment:

```bash
chmod +x ./apply_auto
./apply_auto
```

It may take from 10 to 60 minutes to complete (the first time).

## Usage

First get the Minikube exposed IP direction:

```bash
minikube ip
```

Open the Minikube exposed IP in your favorite web browser to view the host page.

## Test

### Test the deployment

You can verify the health and the state of any resource deployed on Minikube through a dashboard:

```bash
minikube dashboard
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
