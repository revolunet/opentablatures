# opentablatures

 - some tablatures for ukulele beginners
 - generates static html pages for mobile

Online at <a href="http://tabs.revolunet.com">tabs.revolunet.com</a>

### Add a new tablature

Add a new `.md` file in the `tabs` folder.

This file is a standard text-like tablature but support YAML headers too.

see example file :

```md
---
author: Nat King Cole
title: L.O.V.E.
chords: Bb Bb7 C Cmaj7 C7 Dm F F7 G G7 Gm Gm7
video: https://www.youtube.com/watch?v=RLhnyZc9V34
by: juju
---

F    Dm              Gm      C
L is for the way you look at me

Gm7  C            F     F7
O is for the only one I see
```

Then `npm run build` to generate the website

### Todo

 - mobile-friendly (offline)

 - handle strumming patterns in YAML header

 - auto-scroll

 - generate guitar versions too
