# 0011 Template ids match role semantics

Status: implemented.

## Context

Three default templates used request ids that did not match their hats, emblems,
or roles: `assistant` was the purple beanie with `badge-code` (role `coder`),
`builder` was the flask badge (role `test`), and `caretaker` was the charcoal
cap with `badge-shield` (role `security`). Optional variants already used
role-modifier ids (`docs-editor`, `security-officer`, `deploy-aviator`,
`build-red`).

[ADR 0002](0002-deterministic-svg.md) treated role names as catalog metadata
rather than request lookup. [ADR 0004](0004-hat-diversity.md) kept the original
request ids on purpose. Callers and the Studio menu still had to remember that
the public id and the role were different names for one bot.

## Decision

Manifest 1.9.6 makes the default template id the role name: `coder`, `test`, and
`security`. Variant ids stay role modifiers, and `security` does not replace
`security-officer`.

The role map still points each role at one default template. Keys that are not
themselves template ids are legacy aliases: `assistant` → `coder`, `builder` →
`test`, and `caretaker` → `security`. Normalization checks the template id
first, then one role-map hop. The stored template id is the preferred id, so an
alias request and a preferred-id request share hat identity, SVG bytes, and the
resource key. A role key that collides with a different template id is an
invalid catalog, which keeps `security-officer` addressable.

Renderer 0.13.0 accepts manifest 1.9.6. Drawing is unchanged. The SVG title
uses the preferred id. Regression baselines keep the same pixels and update
only that title, plus the request id recorded beside it.

`research` and `ai` both use `badge-sparkle`. The catalog has no unused academic
emblem, and `badge-document` already identifies docs. Research keeps the sparkle
badge until a fitting asset is added through the icon pipeline.

## Consequences

This amends the ADR 0002 rule that role names are never used to resolve a
request, and the ADR 0004 choice to keep `assistant`, `builder`, and `caretaker`
as the only public ids. Direct template ids still win over aliases. Old requests
continue to render. New catalog listings, Studio labels, and examples use the
preferred ids.

Resource keys change with the manifest version and the canonical template id.
Caches from 1.9.5 do not match 1.9.6 output even when the picture is the same.

## Validation

Behavior tests check that each legacy id normalizes to the same avatar as its
preferred id, that `security-officer` stays distinct, and that a role alias
cannot hide a real template id. `pnpm check` covers formatting, lint, types, and
the updated regression SVGs.
