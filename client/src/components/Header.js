import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import UserAuth from './auth/UserAuth';

const Header = () => {
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <Link to={"/"} class="navbar-brand" href="#">Live</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <Link to={"/"} class="nav-link active" >Live Rooms
            <span class="visually-hidden">(current)</span>
          </Link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Posts</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">User Profile</a>
        </li>
      </ul>
      <GoogleAuth />
      <UserAuth/>
    </div>
  </div>
</nav>
    );
}
export default Header;