import React, { useContext, useState } from "react";
import { act } from "react-dom/test-utils";
import { EscolaLMSContext } from "./../../src/react/context";
import { render, fireEvent, waitFor, screen } from "../test-utils";
import { Login } from "./helpers/login";
import "@testing-library/jest-dom";

import fakeServer from "../test_server";

import { registerDataSuccess } from "../test_server/auth";
import { generateDataResponse } from "../test_server/jwt";
import { dataSuccess } from "../test_server/me";

beforeAll(() => {
  fakeServer();
});

const Register = () => {
  const { register } = useContext(EscolaLMSContext);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ success: false });

  return (
    <div>
      <button
        data-testid="button-valid"
        onClick={() => [
          setLoading(true),
          register({
            first_name: "test",
            last_name: "test",
            email: "test2@test.pl",
            password: "Test1234!",
            password_confirmation: "Test1234!",
            return_url: "https://demo-stage.escolalms.com",
          }).then(() => [setResponse({ success: true }), setLoading(false)]),
        ]}
      >
        Register Correct
      </button>
      <button
        data-testid="button-invalid"
        onClick={() => [
          setLoading(true),
          register({
            first_name: "test",
            last_name: "test",
            email: "test@test.pl",
            password: "Test1234!",
            password_confirmation: "Test1234!",
            return_url: "https://demo-stage.escolalms.com",
          }).catch(() => [setResponse({ success: false }), setLoading(false)]),
        ]}
      >
        Register email taken
      </button>

      <div data-testid="register-loading">{loading ? "Loading" : "Loaded"}</div>
      {!response.success && <div data-testid="register-error">Error</div>}
      {response.success && <div data-testid="register-success">Registered</div>}
    </div>
  );
};

const Forgot = () => {
  const { forgot } = useContext(EscolaLMSContext);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({ success: false });

  return (
    <div>
      <div data-testid="forgot-loading">{loading ? "Loading" : "Loaded"}</div>
      <button
        data-testid="button-valid"
        onClick={() => [
          setLoading(true),
          forgot({
            email: "test@test.pl",
            return_url: "https://demo-stage.escolalms.com",
          })
            .then((response) => {
              if (response.success) {
                setResponse({ success: true });
              }
            })
            .catch((error) => {
              if (error) {
                setResponse({ success: false });
              }
            })
            .finally(() => setLoading(false)),
        ]}
      >
        Reset password
      </button>
      {!response.success && <div data-testid="forgot-error">Error</div>}
      {response.success && (
        <div data-testid="forgot-success">Password reset email sent</div>
      )}
    </div>
  );
};

const UpdateProfile = () => {
  const { updateProfile, user } = useContext(EscolaLMSContext);

  return (
    <div>
      <Login />

      <button
        data-testid="update-profile"
        onClick={() =>
          updateProfile({
            first_name: "Admin",
            last_name: "Kowalski",
            age: 30,
            gender: 1,
            country: "Poland",
            city: "TestCity",
            street: "TestStreet",
            postcode: "00-000",
            phone: "55544455",
          })
        }
      >
        Update profile
      </button>
      <div data-testid="user-loading">
        {user.loading ? "Loading" : "Loaded"}
      </div>
      {user.error && <div data-testid="user-error">Error</div>}
      {user.value && (
        <div data-testid="user-name">
          {user.value.first_name} {user.value.last_name}
        </div>
      )}
    </div>
  );
};

it("checks register logic", async () => {
  render(<Register />);

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  act(() => {
    fireEvent(
      screen.getByTestId("button-invalid"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Error")).toBeInTheDocument();
  });

  act(() => {
    fireEvent(
      screen.getByTestId("button-valid"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("register-success")).toHaveTextContent(
    registerDataSuccess.message
  );
});

// reset password test on forgot action
it("checks forgot logic", async () => {
  render(<Forgot />);

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  act(() => {
    fireEvent(
      screen.getByTestId("button-valid"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Password reset email sent")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });
});

it("checks profile update logic", async () => {
  const data = generateDataResponse(5);

  window.localStorage.setItem(
    "user_token",
    JSON.stringify({
      token: data.data.token,
    })
  );
  act(() => {
    render(<UpdateProfile />);
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  act(() => {
    fireEvent(
      screen.getByTestId("update-profile"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  expect(screen.getByTestId("user-name")).toHaveTextContent("Admin Kowalski");
});

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { initAccountDelete } = useContext(EscolaLMSContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      <Login />
      <button
        data-testid="delete-account"
        onClick={() => {
          setLoading(true);
          initAccountDelete("https://demo-stage.escolalms.com")
            .then((res) => {
              if (res.success) {
                setSuccess(true);
              } else {
                setError(true);
              }
            })
            .catch((error) => {
              if (error) {
                setSuccess(false);
                setError(true);
              }
            })
            .finally(() => setLoading(false));
        }}
      >
        Delete Account
      </button>
      <div data-testid="delete-loading">{loading ? "Loading" : "Loaded"}</div>
      {error && <div data-testid="delete-error">Error</div>}
      {success && (
        <div data-testid="delete-success">Account delete email sent</div>
      )}
    </div>
  );
};

it("checks delete account logic", async () => {
  const data = generateDataResponse(5);

  window.localStorage.setItem(
    "user_token",
    JSON.stringify({
      token: data.data.token,
    })
  );

  act(() => {
    render(<DeleteAccount />);
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  act(() => {
    fireEvent(
      screen.getByTestId("delete-account"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  await waitFor(() => {
    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Loaded")).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByText("Account delete email sent")).toBeInTheDocument();
  });
});

export {}; // 👈️ if you don't have anything else to export
