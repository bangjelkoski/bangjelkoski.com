---
title: Pragmatic and lightweight search for Laravel Models
date: 2019/07/16
slug: pragmatic-and-lightweight-search-for-laravel-models
excerpt: If you only require a simple `search engine` this is the right way to do it.
keywords: laravel eloquent, eloquent search, model search, eloquent models, eloquent scopes, larvel scopes, laravel macros, eloquent macros
image: /images/laravel-eloquent.jpeg
category: Laravel
tags: laravel, advanced laravel, laravel's eloquent
---

You can always install [Laravel scout](https://laravel.com/docs/5.9/scout) and use some of its engines for **searching**. However sometimes we don't need that heavy-on-server search, so we can use this simple approach for **searching data** in your databases.

If you want to search for some data in the database, for example search for some _Users_ by their username or email, you can perform a search using Eloquent like this:

```php
$users = User::where('username', 'LIKE', "%{$username}%")
  ->orWhere('email', 'LIKE', "%{$email}%")
  ->get();
```

There are two way to do this, so I am going to cover both of them now and explain when to use which approach.

## First approach: Using macros {class=marginless}

This approach is good when you want to include the search to all of your models, and now just one of them. Using macros you can _simply create a function that will give you the possibility of chaining **Eloquent query** into one function and calling it anywhere within your application._

If you want to define a macro, you have to do it in a **service provider**. You can either add the macro to `AppServiceProvider.php` or create a new service provider called (for example) `MacroServiceProvider.php` and place the macro in the `boot` method of the service provider. If you create a new service provider, don't forget to add it to the service providers array in `config/app.php` .

To define a macro, you simply use the **macro static method** on the class you want to define the macro to. We need to define a macro for the **Eloquent class**, so we can extend it like this (in the boot method of the service provider):

```php
Builder::macro('whereLike', function($column, $search) {
  return $this->where($column, 'LIKE', "%{$search}%");
});
```

The way we can use this macro now is simple:

```php
User::whereLike('username', $username)
  ->whereLike('email', $email)
  ->get();
```

We can still improve the macro we just wrote. This macro only covers if we want to search only one column. So, if we want to search multiple columns then we have to extend this macro to support multiple columns. If we want to perform multiple column search we are going to use the `orWhere` Eloquent's method. Lets do that.

```php
Builder::macro('whereLike', function($columns, $search) {
  $this->where(function($query) use ($columns, $search) {
    foreach(array_wrap($columns) as $column) {
      $query->orWhere($column, $search);
    }
  });

  return $this;
});
```

So now, if we pass a single column (using the array_wrap function we convert it to an array), and search that column, but if we add multiple columns in an array than we loop through all of them and search the search term in all of those columns. Everything is wrapped in an `where` query because we dont want the `whereLike` query to mess up any other `where` queries we can perform on the Eloquent model.

You can use this macro now like this:

```php
User::whereLike(['username', 'email'], $search)
  ->where('enabled', true)
  ->get();
```

## Second approach: Using scopes {class=marginless}

If you dont need the 'search' functionality in all of your models, you can define a [scope](https://laravel.com/docs/5.0/eloquent#query-scopes) for your model. If we want to do this on the User model, open the `User.php` model and add the scope like this:

```php
public function scopeWhereLike($query, $columns, $search) {
  $query->where(function($q) use ($columns, $search) {
    foreach(array_wrap($columns) as $column) {
      $q->orWhere($column, $search);
    }
  });

  return $query;
}
```

There are many options if you need a more advanced search. Here are some of them like [Laravel Scout](https://laravel.com/docs/5.7/scout), [Algolia](https://www.algolia.com/), [Elasticsearch](https://www.elastic.co/).

**Happy searching!**
