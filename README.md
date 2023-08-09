# Node Metrics Server

A simple Node.js server exposing health and Prometheus metrics endpoints.

## Description

This project, `node-metrics`, provides a setup to run a Node.js server with two main endpoints:

1. `/health`: To check the health of the server, which responds with `OK`.
2. `/metrics`: To fetch Prometheus-style metrics suitable for monitoring.

The metrics include default Node.js metrics and can easily be scraped by Prometheus or similar monitoring tools.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (if using the Docker image)

## Installation & Usage

### Using Docker

You can pull the Docker image of this repository from GitHub Container Registry.

- **Latest version**:

  ```bash
  docker pull ghcr.io/minuchi/node-metrics:latest
  ```

- **Specific version (e.g., v1.0.0)**:

  ```bash
  docker pull ghcr.io/minuchi/node-metrics:v1.0.0
  ```

To run the Docker container:

```bash
docker run -p 3000:3000 ghcr.io/minuchi/node-metrics:latest
```

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/minuchi/node-metrics.git
   cd node-metrics
   ```

2. **Install Dependencies**:
   ```bash
   yarn
   ```

3. **Build the Project**:
   ```bash
   yarn build
   ```

### Running the Server

By default, the server runs on port `3000`. You can configure it using the `PORT` environment variable.

- **Production**:
  ```bash
  yarn start
  ```

  OR to specify a port:

  ```bash
  PORT=4000 yarn start
  ```

  This will run the server on port `4000`.

- **Development**:
  ```bash
  yarn dev
  ```

### Access the Endpoints

- Health: `http://localhost:3000/health` (or the port you specified)
- Metrics: `http://localhost:3000/metrics`

## Development Tools

- **Prettier**:
  To format your TypeScript files, run:

  ```bash
  yarn format
  ```
