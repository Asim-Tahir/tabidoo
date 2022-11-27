export default function register(prefix: string = "tabidoo") {
  const components = import.meta.glob<true, string, CustomElementConstructor>(
    `./(components|views)/**/*.{wc,ce}.{ts,js}`,
    {
      import: "default",
      eager: true,
    }
  );

  for (const path in components) {
    const component_name = path
      .split("/")
      .at(-2)
      ?.replace(/\.(wc|ce)\.([tj]s)$/, "")
      ?.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        (uppr, ofs) => (ofs ? "-" : "") + uppr.toLowerCase()
      );

    if (
      !customElements.get(`${prefix}-${component_name}`) &&
      /[a-z\-]+\/index\.(wc|ce)\.[tj]s$/.test(path) &&
      components[path]
    ) {
      customElements.define(`${prefix}-${component_name}`, components[path]);
    }
  }
}
