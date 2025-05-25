import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect, test } from "vitest";
import Login from '../components/Login';
import Signup from '../components/Signup';

describe('Login', () => {
  it('renders', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Login  setLogged={()=>{}}/>} />
        </Routes>
      </MemoryRouter>
    );
    //screen.debug();

    expect(screen.queryAllByText('Login').length).toBe(2);
    expect(screen.queryByText('Email address')).toBeVisible();
    expect(screen.queryByText('Password')).toBeVisible();
  });
});

describe('SignUp', () => {
  it('renders', () => {
    render(
      <MemoryRouter initialEntries={["/signUp"]}>
        <Routes>
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </MemoryRouter>
    );
    screen.debug();

    expect(screen.queryByText('Create account')).toBeVisible();
    expect(screen.queryByText('Email address')).toBeVisible();
    expect(screen.queryByText('Create password')).toBeVisible();
    expect(screen.queryByText('Confirm password')).toBeVisible();
  });
});
