
# Weekly Progress

**1/18/20 - 1/25/20**
- Added numeric ranges (short, long, etc) in variable declaration. (Chris, Jon)
- endl block can now receive input values. (Chris)
- Added type check warning for initialization Block. (Chris)

**1/25/20 - 2/01/20**
- Added switch case statements. (Chris, Jon)
- Added exponential block (Chris, Jon)

**2/01/20 - 2/08/20**
- Started changed alerts to block warnings. (Chris, Jon)

**2/08/20 - 2/15/20**
- Finished tooltips for chapter 1. (Jon)
- Partially finished switch form alerts to block warnings, (Chris, Christopher)

**2/15/20 - 2/22/20**
- Added a save feature. (Chris)
- Added type checking to switch case statements (Christopher)

**2/22/20 - 2/29/20**
- Added a load feature. (Chris)
- partially redid vectors and arrays, including type checking (Chris, Christopher, Jon)
- Added type checking to logic blocks (Christopher)
- Added type checking to chapter 4 (Christopher)
- Fixed a variable bug with the for loop (Christopher)

**2/29/20 - 3/07/20**
- Started working on examples for every chapter. (Chris)
- Removed vector size on vector block (Chris, Christopher, Jon)
- Removed const option on variable declaration (Jon)
- Added type checking to cctype blocks (Christopher)

**3/07/20 - 3/14/20**
- Finished examples for every chapter. (Chris)
- Removed a bug with float/double on variable initialization relating to user inputted decimals (Jon)
- Removed short, long, etc from the variable declaration block, and implemented it into the type options. (Chris, Jon)

**3/14/20 - 3/21/20**
- Researched mutators (Chris, Jon)

**3/21/20 - 3/28/20**
- Started implementing mutators for cout, and cin mutator blocks. (Chris, Jon)
- Started implementing mutators for switch cases, and functions. (Chris)
- Added blockName (get block name), dataStr (block type), setFalse (sets all block types to be false for a single block). (Chris)

**3/28/20 - 4/04/20**
- Finished cout, and cin mutators. (Chris, Jon)
- Fixed type check warnings that appear on blocks, so they are no longer permanent. (Chris, Jon)
- Started to work on custom context menus for blocks. (Chris)

**4/11/20 - 4/18/20**
- Finished const variable mutator. (Chris, Christopher)
- Changed warning texts to appear instantly. (Chris)
- Added warning text for variable declaration and variable initialization. (Chris, Christopher)
- Working on changing localizing from string literals into proper class localization. (Jon)

**4/18/20 - 4/25/20**
- Started working on the research paper. (Christopher, Jon)
- Started working on the documentation. (Chris, Christopher)
- Fleshed out type checking for variable declaration and initialization (Chris)
- Finished mutators for switch case statements, need to add code generation (Chris)
- Changed Blockly webpage to save space. (Chris)
- Deleted blockName from the Blockly.Block library (Chris)
- Began to develop scope checking using binary trees (Chris)

# Blockly [![Build Status]( https://travis-ci.org/google/blockly.svg?branch=master)](https://travis-ci.org/google/blockly)


Google's Blockly is a web-based, visual programming editor.  Users can drag
blocks together to build programs.  All code is free and open source.

**The project page is https://developers.google.com/blockly/**

![](https://developers.google.com/blockly/images/sample.png)

Blockly has an active [developer forum](https://groups.google.com/forum/#!forum/blockly).  Please drop by and say hello. Show us your prototypes early; collectively we have a lot of experience and can offer hints which will save you time. We actively monitor the forums and typically respond to questions within 2 working days.

Help us focus our development efforts by telling us [what you are doing with
Blockly](https://developers.google.com/blockly/registration).  The questionnaire only takes
a few minutes and will help us better support the Blockly community.

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)

Want to contribute? Great! First, read [our guidelines for contributors](https://developers.google.com/blockly/guides/modify/contributing).

## Releases

We release by pushing the latest code to the master branch, followed by updating our [docs](https://developers.google.com/blockly) and [demo pages](https://blockly-demo.appspot.com). We typically release a new version of Blockly once a quarter (every 3 months). If there are breaking bugs, such as a crash when performing a standard action or a rendering issue that makes Blockly unusable, we will cherry-pick fixes to master between releases to fix them. The [releases page](https://github.com/google/blockly/releases) has a list of all releases.

Releases are tagged by the release date (YYYYMMDD) with a leading '2.' and a trailing '.0' in case we ever need a major or minor version (such as [2.20190722.1](https://github.com/google/blockly/tree/2.20190722.1)). If you're using npm, you can install the ``blockly`` package on npm: 
```bash
npm install blockly
```

### New APIs

Once a new API is merged into master it is considered beta until the following release. We generally try to avoid changing an API after it has been merged to master, but sometimes we need to make changes after seeing how an API is used. If an API has been around for at least two releases we'll do our best to avoid breaking it.

Unreleased APIs may change radically. Anything that is in `develop` but not `master` is subject to change without warning.

### Branches

There are two main branches for Blockly.

**[master](https://github.com/google/blockly)** - This is the (mostly) stable current release of Blockly.

**[develop](https://github.com/google/blockly/tree/develop)** - This is where most of our work happens. Pull requests should always be made against develop. This branch will generally be usable, but may be less stable than the master branch. Once something is in develop we expect it to merge to master in the next release.

**other branches:** - Larger changes may have their own branches until they are good enough for people to try out. These will be developed separately until we think they are almost ready for release. These branches typically get merged into develop immediately after a release to allow extra time for testing.

## Issues and Milestones

We typically triage all bugs within 2 working days, which includes adding any appropriate labels and assigning it to a milestone. Please keep in mind, we are a small team so even feature requests that everyone agrees on may not be prioritized.

### Milestones

**Upcoming release** - The upcoming release milestone is for all bugs we plan on fixing before the next release. This typically has the form of `year_quarter_release` (such as `2019_q2_release`). Some bugs will be added to this release when they are triaged, others may be added closer to a release.

**Bug Bash Backlog** - These are bugs that we're still prioritizing. They haven't been added to a specific release yet, but we'll consider them for each release depending on relative priority and available time.

**Icebox** - These are bugs that we do not intend to spend time on. They are either too much work or minor enough that we don't expect them to ever take priority. We are still happy to accept pull requests for these bugs.
