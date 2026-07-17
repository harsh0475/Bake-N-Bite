import { useEffect, useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { GOOGLE_CLIENT_ID } from "../../../8_constants/config";
import useAuth from "../hooks/useAuth";

let googleIdentityInitialized = false;

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const renderedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const handleCredentialResponse = useCallback(
    async (response) => {
      try {
        await googleLogin(response.credential);
        navigate("/");
      } catch (err) {
        toast.error(
          typeof err === "string" ? err : "Google sign-in failed."
        );
      }
    },
    [googleLogin, navigate]
  );

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (width && width > 0) {
        setReady(true);
      }
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !ready || renderedRef.current) return;

    let attempts = 0;
    let cancelled = false;

    const renderButton = () => {
      if (cancelled) return;

      if (window.google?.accounts?.id && buttonRef.current && wrapperRef.current) {
        renderedRef.current = true;

        buttonRef.current.innerHTML = "";

        if (!googleIdentityInitialized) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
          });

          googleIdentityInitialized = true;
        }

        const containerWidth = wrapperRef.current.getBoundingClientRect().width;
        const width = Math.max(280, Math.min(Math.floor(containerWidth), 400));

        window.google.accounts.id.renderButton(buttonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "center",
          width,
        });
      } else if (attempts < 20) {
        attempts += 1;
        setTimeout(renderButton, 150);
      }
    };

    renderButton();

    return () => {
      cancelled = true;
    };
  }, [handleCredentialResponse, ready]);

  if (!GOOGLE_CLIENT_ID) {
    return null;
  }

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <div ref={buttonRef} className="flex w-full justify-center" />
    </div>
  );
};

export default GoogleSignInButton;