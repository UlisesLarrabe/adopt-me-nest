# Adopt Me - NestJS

Welcome to the Adopt Me - NestJS project!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Docker](#docker)

## Introduction

This project is built using NestJS, a progressive Node.js framework for building efficient and scalable server-side applications.

## Features

- User authentication and authorization
- Pet listing
- Adoption request management

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/adopt-me-nestjs.git
```

2. Navigate to the project directory:

```bash
cd adopt-me-nestjs
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To start the development server, run:

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`.

## Docker

You can also run the project using Docker. Make sure you have Docker installed on your machine.

1. Build the Docker image:

```bash
docker build -t adopt-me-nest .
```

2. Run the Docker container:

```bash
docker run -p 3000:3000 adopt-me-nest
```

### DockerHub Image

You can pull the Docker image from DockerHub using the following command:

```bash
docker pull uliseslarrabe/adopt-me-nest
```
