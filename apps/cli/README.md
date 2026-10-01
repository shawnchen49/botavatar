# Command-line application

Status: workspace scaffold; the first generation command arrives in Stage 2.

Own argument parsing, library assembly, local file output, and exit codes. Delegate
validation and generation rules to the shared packages. Batch output manifests
belong in this application, not in Core.

No command or executable is advertised until an actual CLI entrypoint exists.

See [architecture](../../docs/architecture.md) and
[directory structure](../../docs/directory-structure.md) for the shared contract.
