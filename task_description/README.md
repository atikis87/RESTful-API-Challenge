# Backend challenge

For this challenge, you will create a RESTful API. You can do this in `PHP`, `Node.js` or `Java`.

This API will be all about reviewing Media. You will start with __Books__, but further Media, like __Movies__, __Video Games__ or __TV/Streaming Series__ can be added later.

## Prepare yourselfs

Its a good idea, to setup your tools before jumping into this challenge.

You are provided with an OpenAPI document, that contains a few Routes. Import that into your prevered API Testing tool like `postman` or `insomnia`. Update the `server` to point to your application.

## Have a foundation
For a quick start into this challenge, you can  reuse your `MVC` challenge. Or you could look at the end of this document where there are some structuring tipps.

Also prepare unit tests to be runnable.

## Goals
The goal of this challenge is to put everything you learned in the last few weeks to work.

- Implement `Users` with all defined endpoints.
- Use `Controllers`, `Models` and `Views` to do so.
- Implement Validation for creating `Users`.
- Implement Authorization for the `Users`.
- Implement Responses and have correct response codes. 

After you have finished these milestones, do the same with another endpoint like `Author` or `Genre`.

- Find out what kind of duplicate code you have.
- Try to remove the duplicate code.

Then try to add the remaining Endpoints.

## Tipps
Here are some tipps on how I would approch this challenge.

### The start

I recommend to start with a `class` called `Application` that, will delegate all functions of the App. 

In `PHP` it might look something like this:

```
// pseudo code ...
class Application {
  public function run() {
    return 'test'
  }
}
```
Which is called in your index.php
```
// pseudo code ...
$app = new Application();
echo $app->run();
```

### What was the input?

Add another `class` called `Request` that will analyse the parameters that the application was called with.

In `PHP` this can read the `$_SERVER`, `$_POST` and so on.

This `class` could provied `methods` like `getRoute`, `getParameters`, `getMethod`.

Important, `$_SERVER`, `$_POST` should not be used in any other class.

```
// pseudo code ...
class Application {

  public function run() {
    $request = new Request();

    $data = $request->getRoute();

    return 'test'
  }
}
```

### What todo with the input?

Add another `class` called `Router` which takes the `Request`. Inside the `Router` you delegate what should happen with the input.

```
// pseudo code ...
class Application {

  public function run() {
    $request = new Request();

    $router = new Router($request);

    $router->route();

    return 'test';
  }
}
```
```
// pseudo code ....
class Router {

  function __construct($request) {
    $this->request = $request;
  }

  public function route() {
    // this here will become quite large ...
    switch($this->request->getRoute()) {
      case 'users'
        // usersController
        break;
      case 'books'
        // booksController
        break;
    }
  }
}
```





