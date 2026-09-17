
export function getCookie(name: string): string {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((row) =>
    row.startsWith(`${name}=`)
  );

  return cookie ? cookie.split("=")[1] : "";
}
