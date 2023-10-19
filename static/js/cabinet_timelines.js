const header = $(".canvas-overlay-content .header-wrapper h1"),
    headerAfter = $(".canvas-overlay-content .header-wrapper h1 .underline"),
    _laptop = $(".canvas-overlay-content .annotation-wrapper.laptop"),
    _book = $(".canvas-overlay-content .annotation-wrapper.book"),
    _lanyard = $(".canvas-overlay-content .annotation-wrapper.lanyard"),
    _ma3 = $(".canvas-overlay-content .annotation-wrapper.ma3"),
    _necker = $(".canvas-overlay-content .annotation-wrapper.necker"),
    _knives = $(".canvas-overlay-content .annotation-wrapper.knives"),
    _badges = $(".canvas-overlay-content .annotation-wrapper.badges"),
    _lxtape = $(".canvas-overlay-content .annotation-wrapper.lxtape")


export const mainview = gsap.timeline()
    .to(_lxtape, .5, { opacity: 0 }, 0)
    .to(_laptop, .5, { opacity: 0 }, 0)

    .to(header, 0, { opacity: 1 }, 1)

    .fromTo(
        header,
        1,
        { background: "radial-gradient(#eee 0%, transparent 0%)" },
        { background: "radial-gradient(#eee 0%, transparent 100%)" },
        1
    )

    .to(
        header,
        1,
        { background: "radial-gradient(#eee 100%, transparent 100%)" },
        1.5
    )

    .fromTo(
        headerAfter,
        1.5,
        { background: "linear-gradient(to right, transparent 0%, transparent 50%, white 50%, white 50%, transparent 50%, transparent 100%)" },
        { background: "linear-gradient(to right, transparent 0%, transparent 0%, white 0%, white 100%, transparent 100%, transparent 100%)" },
        1
    )

    .pause()


export const laptop = gsap.timeline()
    .to(header, .5, { opacity: 0 }, 0)
    .to(_book, .5, { opacity: 0 }, 0)

    .to(_laptop, .5, { opacity: 1 }, 2)
    .pause()


export const book = gsap.timeline()
    .to(_laptop, .5, { opacity: 0 }, 0)
    .to(_lanyard, .5, { opacity: 0 }, 0)

    .to(_book, .5, { opacity: 1 }, 2)
    .pause()


export const lanyard = gsap.timeline()
    .to(_ma3, .5, { opacity: 0 }, 0)
    .to(_book, .5, { opacity: 0 }, 0)

    .to(_lanyard, .5, { opacity: 1 }, 2)
    .pause()


export const ma3 = gsap.timeline()
    //.to(_stuff, .5, { opacity: 0 }, 0)
    .to(_lanyard, .5, { opacity: 0 }, 0)

    .to(_ma3, .5, { opacity: 1 }, 2)
    .pause()


export const stuff = gsap.timeline()
    .to(_necker, .5, { opacity: 0 }, 0)
    .to(_ma3, .5, { opacity: 0 }, 0)

    //.to(stuff, .5, { opacity: 1 }, 2)
    .pause()


export const necker = gsap.timeline()
    .to(_knives, .5, { opacity: 0 }, 0)
    //.to(stuff, .5, { opacity: 0 }, 0)

    .to(_necker, .5, { opacity: 1 }, 2)
    .pause()


export const knives = gsap.timeline()
    .to(_badges, .5, { opacity: 0 }, 0)
    .to(_necker, .5, { opacity: 0 }, 0)

    .to(_knives, .5, { opacity: 1 }, 2)
    .pause()


export const badges = gsap.timeline()
    .to(_lxtape, .5, { opacity: 0 }, 0)
    .to(_knives, .5, { opacity: 0 }, 0)

    .to(_badges, .5, { opacity: 1 }, 2)
    .pause()


export const lxtape = gsap.timeline()
    .to(header, .5, { opacity: 0 }, 0)
    .to(_badges, .5, { opacity: 0 }, 0)

    .to(_lxtape, .5, { opacity: 1 }, 2)
    .pause()