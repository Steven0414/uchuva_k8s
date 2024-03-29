# Uchuva: Microservices implementation

Uchuva is a scientific web portal that allows to create workflows and submit them to HTCondor (Dagman), Slurm, OpenLava (LSF) and Torque (PBS). 
It is designed to be fast, flexible and simple.

Uchuva was implemented following a monolithic approach.
This new implementation follows a microservice architecture thus enhances the scalability and upgradability aspects of the original version.

Original project [GitHub repository](https://github.com/carlochess/uchuva).

## Installation

### Before

Verify that you have enabled virtualization.

#### On Linux

```bash
egrep --color 'vmx|svm' /proc/cpuinfo
```

#### On Mac

```bash
sysctl -a | grep machdep.cpu.features | grep VMX
```

It must show something like this:

```
machdep.cpu.features: FPU VME DE PSE TSC MSR PAE MCE CX8 APIC SEP MTRR PGE MCA CMOV PAT PSE36 CLFSH DS ACPI MMX FXSR SSE SSE2 SS HTT TM PBE SSE3 PCLMULQDQ DTES64 MON DSCPL VMX EST TM2 SSSE3 FMA CX16 TPR PDCM SSE4.1 SSE4.2 x2APIC MOVBE POPCNT AES PCID XSAVE OSXSAVE SEGLIM64 TSCTMR AVX1.0 RDRAND F16C
```

### Dependencies

#### Install a hypervisor

If you don't have a hypervisor installed, please install one. [VirtualBox](https://www.virtualbox.org/wiki/Downloads), [KVM](https://www.linux-kvm.org/page/Main_Page).

#### Install kubectl on Linux

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

#### Install kubectl on Mac

```bash
brew install kubectl
```

Additional details can be found at [Install and Set Up kubectl on macOS](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/).

#### Install Minikube on Linux

For local Kubernetes cluster.

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
  && chmod +x minikube
sudo cp minikube /usr/local/bin && rm minikube
```

A complete installation guide for minikube can be found at [Install Minikube](https://v1-18.docs.kubernetes.io/es/docs/tasks/tools/install-minikube/).


#### Install Minikube on Mac

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube
```

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

### LoadTest

This test allows to verify the response time of the uchuva-index microservice.
This test is executed with [K6/LoadImpact](https://k6.io/).

#### Testing with K6/LoadImpact Docker Container
```bash
cd ./test
sudo docker run -i loadimpact/k6 run -< loadtest.js
```

A complete testing guide with K6/LoadImpact can be found at [K6's official documentation](https://k6.io/docs/).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
