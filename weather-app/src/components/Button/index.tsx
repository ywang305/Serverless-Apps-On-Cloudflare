"use client";

import { useRouter } from "next/navigation";

export const Button = () => {
  const router = useRouter();

  function handleClick() {
    const location = document.getElementById(
      "location-select"
    ) as unknown as HTMLSelectElement;

    router.push(`/weather/${location.value}`);
  }

  return (
    <button
      type="button"
      style={{ textDecoration: "none" }}
      onClick={handleClick}
    >
      <span
        className="input-group-text border-0 fw-bold"
        id="search-addon"
        style={{ background: "none" }}
      >
        Check!
      </span>
    </button>
  );
};
