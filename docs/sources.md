# Macro Builder source log

Rule (Kori, Oct 13 2026): official public docs, or 2+ independent public sources that agree. Own words only. Nothing from work. Generic Haas / Fanuc 0i-style. Not affiliated with any machine or control maker.

Items tagged **official** rest on the control maker's own public manual (allowed on its own). Everything else has 2+ independent sources.

## Source keys

- **HMG**: Haas mill G-code list (haascnc.com) — https://www.haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---g-codes.html
- **HLG**: Haas lathe G-code list (haascnc.com) — https://www.haascnc.com/service/online-operator-s-manuals/lathe-operator-s-manual/lathe---g-codes.html
- **HMM**: Haas mill M-code list (haascnc.com) — https://www.haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---m-codes.html
- **HLM**: Haas lathe M-code list (haascnc.com) — https://www.haascnc.com/service/online-operator-s-manuals/lathe-operator-s-manual/lathe---m-codes.html
- **HMAC**: Haas mill macros chapter (haascnc.com) — https://www.haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---macros.html
- **HLT**: Haas live-tool training PDF (productivity.com) — https://productivity.com/wp-content/uploads/2019/01/Haas-Live-Tooling-for-Haas-Lathes.pdf
- **PMF**: practicalmachinist.com forum — https://practicalmachinist.com/forum/threads/st20-live-tooling-not-cutting-square.292057/
- **F0I**: Fanuc 0i-F Plus operator manual G-code table — https://manualmachine.com/fanuc/0ifplus/24332568-operators-manual/
- **FOC**: Fanuc FOCAS G-code group table (inventcom.net) — https://www.inventcom.net/fanuc-focas-library/misc/cnc_rdgcode
- **REA**: Fanuc lathe G/M list (reacocnc.com) — https://reacocnc.com/blogs/fanuc-g-code-m-code-list/g-code-m-code-lathe
- **ZAP**: zappettiniconsulting.com — https://zappettiniconsulting.com/wiki/fanuc-turning-programming
- **MFG**: machinemfg.com Fanuc lathe guide — https://www.machinemfg.com/fanuc-cnc-lathe-commands/
- **KEL**: Fanuc 0i lathe trainer list (cnc-keller.de) — https://download.cnc-keller.de/F0IAD-EN.pdf
- **HEL**: helmancnc.com — https://www.helmancnc.com/
- **CDT**: cncdata.co.uk Fanuc macro PDF — https://img1.wsimg.com/blobby/go/671d8571-de15-47bb-8cd8-b624751dbe0e/downloads/zixubivufazewavi.pdf
- **PMT**: Fanuc Power Mate i operators manual (cncmanuals.com) — http://cncmanuals.com/fanuc/93/fanuc-power-mate-i-model-d-h-operators-manual/page/125
- **MMS**: mmsonline.com (Mike Lynch) — https://www.mmsonline.com/articles/converting-time-and-date-to-a-more-useful-format
- **F30**: Fanuc 30i users manual (cncmanuals.com) — http://www.cncmanuals.com/fanuc/773/30i-300i-300is-ma-31i-310i-310is-ma-a5-32i-320i-320is-ma-common-to-lathe-machining-center-users-manual/page/439

## Round 25 (Oct 13) — codes added (64)

| Code | Meaning (our words) | Control | Sources |
|---|---|---|---|
| G09 | Exact stop for this one block | both | HMG, F0I |
| G29 | Return from reference point | both | HMG, FOC |
| G31 | Skip: feed until the probe (skip) signal | both | HMG, F0I |
| G44 | Tool length compensation minus | both | HMG, F0I |
| G51 | Scaling on (option) | both | HMG, FOC |
| G60 | Single-direction positioning | both | HMG, FOC |
| G61 | Exact stop mode (stays on until G64) | both | HMG, F0I |
| G64 | Cutting mode (cancels G61) | both | HMG, F0I |
| G86 | Bore, stop spindle at bottom, rapid out | both | HMG, FOC |
| G89 | Bore, dwell at bottom, feed out | both | HMG, FOC |
| G92 | Mill: shift the work coordinates. Fanuc lathe (G-code system A): threading cycle | both | HMG, ZAP, REA |
| G32 | Lathe: single-pass threading move | both | HLG, MFG, KEL |
| G75 | Lathe: grooving / peck grooving cycle | both | HLG, MFG |
| G15 | Polar coordinate command off (Fanuc-style mill) | fanuc | FOC, HEL |
| G16 | Polar coordinate command on (Fanuc-style mill; X = radius, Y = angle) | fanuc | FOC, HEL |
| G30 | Return to 2nd/3rd/4th reference point (Fanuc-style) | fanuc | FOC, REA |
| G50.1 | Programmable mirror image off (Fanuc-style) | fanuc | F0I, REA |
| G51.1 | Programmable mirror image on (Fanuc-style) | fanuc | F0I, REA |
| G63 | Tapping mode (Fanuc-style) | fanuc | F0I, REA |
| G66.1 | Modal macro call B: runs the macro after every block (Fanuc-style) | fanuc | F0I, FOC |
| G12 | Haas mill: circular pocket clockwise | haas | HMG (official) |
| G13 | Haas mill: circular pocket counter-clockwise | haas | HMG (official) |
| G35 | Haas mill: automatic tool diameter measurement (probe) | haas | HMG (official) |
| G36 | Haas mill: automatic work offset measurement (probe) | haas | HMG (official) |
| G37 | Haas mill: automatic tool offset measurement (probe) | haas | HMG (official) |
| G47 | Haas mill: text engraving | haas | HMG (official) |
| G77 | Haas mill: back bore cycle | haas | HMG (official) |
| G100 | Haas mill: mirror image off | haas | HMG (official) |
| G101 | Haas mill: mirror image on | haas | HMG (official) |
| G103 | Haas: limit block look-ahead (P1 = one block) | haas | HMG, HMAC |
| G136 | Haas mill: automatic work offset center measurement | haas | HMG (official) |
| G150 | Haas mill: general pocket milling | haas | HMG (official) |
| G154 | Haas: extended work offsets G154 P1–P99 | haas | HMG, HMAC |
| G187 | Haas mill: smoothness level | haas | HMG (official) |
| M02 | Program end | both | HMM, REA |
| M19 | Spindle orient (Haas; on Fanuc-style machines the number is set by the builder) | haas | HMM, HLM |
| M29 | Fanuc-style mill: rigid tap mode before G84 (number set by the builder). Haas mill: output relay with M-fin | both | HMM, ZAP |
| M10 | Haas mill: 4th-axis brake on. Haas lathe: chuck clamp | haas | HMM, HLM |
| M11 | Haas mill: 4th-axis brake off. Haas lathe: chuck unclamp | haas | HMM, HLM |
| M31 | Haas: chip conveyor / auger forward | haas | HMM, HLM |
| M33 | Haas: chip conveyor / auger stop | haas | HMM, HLM |
| M59 | Haas: turn on output relay | haas | HMM, HLM |
| M69 | Haas: turn off output relay | haas | HMM, HLM |
| M73 | Haas mill: tool air blast on | haas | HMM (official) |
| M74 | Haas mill: tool air blast off | haas | HMM (official) |
| M78 | Haas: alarm if skip signal found | haas | HMM, HLM |
| M79 | Haas: alarm if skip signal not found | haas | HMM, HLM |
| M83 | Haas mill: air gun on | haas | HMM (official) |
| M84 | Haas mill: air gun off | haas | HMM (official) |
| M88 | Haas: through-spindle (mill) / high-pressure (lathe) coolant on | haas | HMM, HLM |
| M89 | Haas: through-spindle / high-pressure coolant off | haas | HMM, HLM |
| M97 | Haas: local subprogram call (N label in the same program) | haas | HMM, HMAC |
| M109 | Haas: interactive operator input | haas | HMM, HMAC |
| M14 | Haas lathe: main spindle brake on | haas | HLM, HLT |
| M15 | Haas lathe: main spindle brake off | haas | HLM, HLT |
| M21 | Haas lathe: tailstock advance | haas | HLM (official) |
| M22 | Haas lathe: tailstock retract | haas | HLM (official) |
| M23 | Haas lathe: chamfer out of thread on | haas | HLM (official) |
| M24 | Haas lathe: chamfer out of thread off | haas | HLM (official) |
| M133 | Haas lathe: live tool forward (P = RPM) | haas | HLM, HLT |
| M134 | Haas lathe: live tool reverse | haas | HLM, HLT |
| M135 | Haas lathe: live tool stop | haas | HLM, HLT |
| M154 | Haas lathe: C-axis engage | haas | HLT, PMF |
| M155 | Haas lathe: C-axis disengage | haas | HLT, PMF |

## Codes corrected (10)

| Code | New meaning | Sources |
|---|---|---|
| G50 | Lathe: coordinate set or max RPM clamp. Haas mill: scaling cancel | HMG, REA |
| G70 | Lathe: finish cycle. Haas mill: bolt-hole circle | HMG, HLG |
| G71 | Lathe: roughing cycle. Haas mill: bolt-hole arc | HMG, HLG |
| G72 | Lathe: face roughing cycle. Haas mill: bolt holes along an angle | HMG, HLG |
| G90 | Absolute positioning. Fanuc lathe G-code system A: OD/ID turning cycle (absolute is X/Z, incremental U/W) | ZAP, REA |
| G91 | Incremental positioning (not used on Fanuc lathe G-code system A — use U/W) | ZAP, REA |
| G94 | Feed per minute (mill). Fanuc lathe G-code system A: facing cycle (feed per minute is G98 there) | ZAP, REA |
| G107 | Haas mill and lathe: cylindrical mapping. Some Fanuc lathe G-code systems: cylindrical interpolation (same as G07.1) | HMG, HLG, F30 |
| G112 | Haas lathe: XY to XC on (Fanuc: G12.1). Haas mill: work offset #9 | HMG, HLG |
| G113 | Haas lathe: XY to XC off (Fanuc: G13.1). Haas mill: work offset #10 | HMG, HLG |

## System variables

| Item | Change | Sources |
|---|---|---|
| Haas #3001 / #3002 | verify → sourced: ms timer / hour timer, settable | HMAC (official) |
| Haas #3011 / #3012 | verify → sourced: date / time | HMAC (official) |
| Haas #3020–#3027 | verify → sourced, split: power-on, cycle start, feed, present / last / previous part timers, tool in spindle, spindle RPM | HMAC (official) |
| Haas #1080–#1098, #1264–#1268, #3028, #3196, #5051–#5056, #6198, #6996–#6999, #32014 | added | HMAC (official) |
| Haas #3004 bits | added note | HMAC (official) |
| Fanuc #3001 / #3002 | verify → sourced: ms timer (resets at power on) / hour timer (kept at power off) | CDT + MMS (+ mmsonline "Timing events" column) |
| Fanuc #3011 / #3012 | verify → sourced: YYYYMMDD / HHMMSS | CDT + MMS |
| Fanuc G54.1 P1–P48 | **corrected** #7001–#7944 → #7001–#7948 (20 per P, 8 axes used) | CDT + PM forum (practicalmachinist.com/forum/threads/fanuc-31ia-nc-parameter-for-g54-1-p49-p300-needed.245926) |
| Fanuc G54.1 P1–P300 | verify → sourced: #14001–#19988, needs 300-set option | CDT + F30 + PM forum |

## Alarms

| Item | Change | Sources |
|---|---|---|
| Fanuc #3000 | 0–200, shown as 3000+n, message ≤ 26 characters; new check + preview number | PMT + CDT + practicalmachinist.com/forum/threads/user-generated-alarm.399717 |
| Haas #3000 | 1–999, shown as 1000+n; new check + preview number | HMAC (official) |

## Setup fields (all start red and empty, never written into code)

| Field | Why | Sources for the hint |
|---|---|---|
| Lathe G-code system (A / B / C) | G90/G92/G94 mean cycles in system A | ZAP + REA + studylib 0i-TF handbook |
| Spindle orient M-code | builder-set on Fanuc-style; Haas M19 | HMM + HLM (official) |
| Through-spindle coolant on / off | Haas M88 / M89 | HMM (official) |
| 4th-axis brake on / off | Haas mill M10 / M11 | HMM (official) |

## Round 24 (earlier today)

- Fanuc G07.1 / G12.1 / G13.1 and Haas G107 / G112 / G113 formats, C-axis M-code settings: see commit f3b5e45 message and the Engraving Help topic. Plane line G18 W0 H0 settled with Fanuc 21i-TB + 0i-B manuals + CNCzone thread + helmancnc.com (G19 examples found were Syntec / Mitsubishi).

## Skipped (fewer than 2 sources, or sources disagree)

- Fanuc G87 / G88 (mill back bore / manual-retract bore): only one list gave meanings; a lathe list uses G87/G88 for side drilling/tapping.
- Fanuc G34 variable-lead threading: one source.
- Fanuc #3002 run condition: Fanuc manual copy says "while cycle start lamp is on", MMS says "always runs" — kept the manual wording, noted.
- Haas mill M07 (shower coolant) vs Fanuc-style mist M07: builder-specific, left out.
- Fanuc rigid-tap M-code number (M29 typical): builder parameter — described as "set by the builder", not a default.
- Haas lathe M154 / M155 do not appear on the Haas lathe M-code web page; added from the Haas live-tool training PDF + a forum program (2 sources), tagged Haas.

## Round 26 · Tool length check (Oct 13)

| Item | What we use | Sources |
|---|---|---|
| Fanuc H length offsets, memory A/B/C | A: #10001+ (alias #2001+ for 1–200) is the single value. B/C: wear #10000+H, geometry #11000+H (aliases #2000+H / #2200+H, offsets 1–200) | Fanuc 30i/31i parameter manual, No. 6000 table (official, cncmanuals.com copy) + zappettiniconsulting.com Fanuc system variables |
| Fanuc param 6000 bit 3 V15 | 1 = Series 15 numbering: geometry and wear swap for B/C | same two sources |
| Fanuc D radius offsets (memory C) | wear #12000+D, geometry #13000+D | same two sources (reference only, not used by the job) |
| Haas mill tool offsets | length geometry #2000+H, length wear #2200+H, diameter #2401+, diameter wear #2601+ (1–200) | Haas mill operator manual, Macros (official) + inventcom.net + practicalmachinist.com thread |
| Setter call hint (gray, not a default) | Renishaw contact: G65 P9853 B1. T__ sets length; H = tolerance; cycle ends with G28 that cancels the tool offset | Renishaw contact tool setting programming manual (official, hosted by haascnc.com) + eMastercam forum threads |
| Laser setter hint (gray, not a default) | Renishaw laser cycles use G65 P9862 (length), P9863 (plunge broken-tool check) | Renishaw NC1/NC4 programming guides (official) + eMastercam thread |
| #3000 ranges | Fanuc 0–200, 26 chars; Haas 1–999 | Round 25 (above) |

Not used (only one source or builder-specific): Haas WIPS tool-setting macro numbers; Blum macro numbers; setter positions (always from the user's setup sheet).

## Round 27 · Top-10 real-world jobs (Oct 13)

The research list in /workspace/macro-research/real-world-jobs.md was not source-checked by its author; each control-specific fact used below was checked again here.

| Fact used | Sources (official, or 2+ independent that agree) | Used in |
|---|---|---|
| Fanuc #3901 parts completed, #3902 parts required; M30 counts when parameter 6700 bit 0 = 0 | Fanuc 0i/16/18/21 macro executor manual (cncmanuals.com copy, official) + factorywiz.com KB + jitbase KB + glassdome.com | Part counter |
| Haas #3901 / #3902 = M30 counter 1 / 2 (no "required parts" variable) | Haas mill operator manual, Macros (official) + inventcom.net + kb.wolframmfg.com | Part counter |
| Haas variables kept at power off; #100–#199 and #500–#599 used by probes / pallets; #600–#699, #800–#999 for users | Haas mill operator manual (official) + Haas macro programming PDF (official) + inventcom.net | Counter variable checks |
| Fanuc #100–#199 cleared at power off, #500–#999 kept | Fanuc Macro B reference PDF (hobbycnc copy) + studylib Macro B manual + digit-chain.com | Counter variable checks |
| Thread milling direction: internal = G03 (RH bottom up, LH top down), external = G02 (RH top down, LH bottom up), climb, M03 | Haas Tooling thread mill page (official) + Sandvik Coromant application tips (official) + Morse / CPT / Tungaloy catalog programs | Thread mill |
| Internal thread path radius = (major − cutter)/2, tangential arc in / out with 1/8 pitch rise | Morse 2022 catalog p.133 + CPT catalog p.375 + Tungaloy catalog | Thread mill |
| Fanuc POPEN / DPRNT / PCLOS; [ab] digit format; * prints as a space | Fanuc 30i/31i and 21i-TB operator manuals (cncmanuals.com copies, official) + cncci.com | Inspect + DPRNT |
| Haas DPRNT: only command in its block, two-digit [wf] format, Setting 261 = file or TCP, 263 = port | Haas "Communication with external devices – DPRNT" page (official) + factorywiz.com | Inspect + DPRNT |
| Skip positions #5061 / #5062, G10 L2 / L20 offset writes | Round 25 entries (sourced) | Probe boss, corner, inspect |
| Engraving digits | the app's own single-stroke font (Round 24) | Serial engrave |

Flagged / not sourced (kept as gray suggestions or user inputs, never as facts):
- Helical ramp pitch in Circular pocket: suggested from a ~3° ramp; shop practice, not a sourced number — shown gray, user changes it.
- External thread minor Ø: not computed (thread-depth constants not checked here) — the user types it from their thread table.
- Probe on / off M-codes: builder-specific — red field, no hint numbers.
- Warm-up RPM steps and travel limits: user inputs; no published "standard" warm-up schedule was used.
- Skipped from the research list's top 10: nothing skipped; job 7 (broken tool) reuses the Round 26 Tool length check, job 3/8 add boss and corners next to the existing bore / web / pocket jobs.

## Round 28 · Next 10 jobs (Oct 13)

| Fact | Used by | Sources | Status |
|---|---|---|---|
| M98 Pnnnn calls program Onnnn, M99 returns | mvise | Haas M98 page (official) haascnc.com/service/codes-settings.type=mcode.machine=mill.value=M98.html; Fanuc: helmancnc.com/fanuc-sub-programming + getgcode.com/en/cnc-codes/m98-m99 (agree) | OK |
| Haas M98 needs the sub to exist or it alarms | mvise | Haas M98 page (official) | OK, sub left red for user |
| M00 always stops; M01 stops only with Optional Stop on | nstop | Haas M00 page + Haas mill M-code list (official); Fanuc: cnc.wiki M00/M01 page + carbide-tooling.com M-code guide (agree) | OK |
| Lathe G18 XZ plane, G97 RPM (CSS off), G99 feed per rev, safe start G18 G20 G40 G80 G99 | mgroove | Haas lathe manual "Basic Programming" + Haas lathe G-code list + G97 page (official) | OK for Haas. Fanuc 0i-T: same codes in generic sources, but I did not find 2 independent Fanuc-specific pages this round — FLAGGED, verify on control |
| #3011 date YYYYMMDD | datec | see Round 25 rows above | OK |
| #3901 part count, retained var ranges | nstop | see Round 27 | OK |
| Climb direction G03 internal / G02 external (helix) | hbore, rpock, cbpat | reused from Round 27 thread mill rows | OK |

Heuristics (our own defaults, not from any source, shown as suggestions):
- 3° helical ramp angle for rpock/slot/hbore entry.
- Groove plunge step = 80% of insert width (mgroove).
- Chamfer with a 90° spot/chamfer tool: tip depth = chamfer width + hole radius geometry (45° each side). Plain geometry, check your tool's tip angle.
- Shrinking peck factor in peck2 (each peck smaller, never below min peck).

## Round 29 · Batch 3 jobs (Oct 13)

| Fact | Used by | Sources | Status |
|---|---|---|---|
| #3001 millisecond timer, can be reset by writing 0 | ctime | Haas Mill Macros chapter (official) haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---macros.html; Fanuc: Series 15i Macro manual page (cncmanuals.com) + MMS "Timing Events In A Program" + zappettiniconsulting.com alarms-timers (agree) | OK |
| #3002 hour timer | not used | Fanuc manual / Zappettini: counts only while cycle start lamp is on; MMS article: "always runs" — DISAGREE | FLAGGED, not used. Idle time uses #3011 / #3012 instead |
| #3011 date YYYYMMDD, #3012 time HHMMSS | lotc, idlew, ctime | Round 25 rows + Haas Macros chapter + MMS "Converting Time and Date" | OK |
| #3006 message stop | ctime | Haas Macros chapter (official); Fanuc: Zappettini + Fanuc Macro B pdf (cnctar.hobbycnc.hu) | OK |
| G65 argument letters A=#1 B=#2 C=#3 D=#7 E=#8 F=#9 H=#11 M=#13 Q=#17 … Z=#26 | family | Haas Macros chapter (official); Fanuc: MMS "Understanding Argument Assignment Number Two" + Zappettini Haas arguments page (agree) | OK |
| Haas G65 alarms if the sub is missing | family | Haas lathe G65 page (official) | OK, sub is yours |
| G68 X Y R, positive R = counter-clockwise, G69 cancels; Haas needs Rotation and Scaling option; comp on after G68 | rotp | Haas G68 page (official) haascnc.com/service/codes-settings.type=gcode.machine=mill.value=G68.html; Fanuc: cnccookbook.com G68/G69 + cncknowledge.in Fanuc G68 example (agree) | OK; option kept red ("Coordinate rotation (G68)") |
| Fanuc ATAN[a]/[b] two-argument form, result 0–360 | rotp, a4p | industrialmonitordirect.com Fanuc macro article + practicalmachinist.com thread (agree on form); 0–360 range from the first only | Form OK; we normalise >180 to negative so either range works — FLAG: check on control |
| G31 skip; #5061–#5063 skip positions; G10 L2 incremental under G91 | rotp, a4p | Round 27 rows | OK |
| Haas live tool M133 P(rpm) / M135, C axis M154 / M155, G28 H0 after engage advised | cdrill (comment / placeholder only) | Haas Factory Outlet live-tool training pdf (productivity.com) + Morris Trident HFO pdf on haascnc.com + helmancnc.com G81 C-axis (agree) | Codes NOT written by us — user must type them in Machines (red). G28 H0 is only a comment |
| Live tool cutting with G98 feed per minute | cdrill | Haas lathe options programming chapter (official) + the HFO pdfs | OK for Haas; Fanuc lathe G98 = per minute in G-code system A — FLAGGED, verify |
| Lathe G18/G97/G99 safe start | lpeck, ltaper, cdrill | Round 28 row (Haas official; Fanuc flagged) | as Round 28 |
| G02 = clockwise viewed with X up, Z right (standard lathe convention) | ltaper fillet | Plain right-hand-rule geometry; Haas lathe G02/G03 pages use the same view | FLAG: front-turret machines — check direction on a dry run |

Our own defaults / methods (unsourced, shown as suggestions or stated in the program):
- Day-number formula used to compare dates (standard calendar arithmetic, our own code).
- Shift key = day number × 10 + shift index; shift before the first start belongs to yesterday's last shift.
- Chip-break back-off on lathe pecks = Retract (gray 0.01 in); re-approach at 2× feed.
- Keyway: straight plunge per stepdown (needs center-cutting end mill); flat: 50% stepover zigzag.
- Taper roughing: passes parallel to the taper at DOC per side, no finish allowance; no nose radius comp.
- Cross-drill: peck re-approach 0.01 in radial above last depth, OD clearance 0.02 in radial.
- Feeds / RPM gray suggestions (0.002 in/rev groove, 0.008/0.004 in/rev turn, 4 in/min live drill, 1500 live RPM, 800/1200 RPM).

## Round 30 · batch 4 (Oct 13, 2026)

| Fact | Used by | Sources | Status |
|---|---|---|---|
| Haas #1098 = spindle load (vector drive), percent | sload (Haas hint only; value stays red until you confirm it) | Haas Mill Macros chapter (official) haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---macros.html + inventcom.net Haas macro variable list | OK |
| Fanuc spindle load variable | sload | No standard macro variable found (it depends on PMC / builder settings) | FLAGGED: red setting "Spindle load variable", you type it |
| Fanuc look-ahead can read a variable before the move ends | sload | Common forum advice, sources do not agree on a fix | FLAGGED in the program comment: check your control's buffering |
| Haas D geometry / wear #2401 / #2601 | tdia (comment) | Haas Macros chapter (official) | OK |
| G10 L12 / L13 = D geometry / D wear (Haas) | tdia | Haas G10 page (official) + haas.co.uk G10 page | OK |
| Fanuc G10 L10–L13 by memory type (C: L12/L13 for D; A/B: L11) | tdia | Smid "CNC Programming Handbook" excerpt (coursehero) + cncmacros.com + practicalmachinist.com thread (agree) | OK; memory type is a red setting |
| Setter diameter macro call and result # | tdia | Depends on the setter maker | red settings, you type them |
| G31 skip, #5061–#5063 skip positions, G10 L2 | ppres, rotcl | Round 27 rows | OK |
| Haas G76 one-block (X Z K D F A; P, Settings 86/95/96/99) | lthread | Haas lathe G76 page (official) | OK |
| Fanuc G76 two-block: P(spring)(chamfer)(angle) Q(min) R(allow) / X Z P(height) Q(first) F; P/Q in 0.0001 in or microns, no decimal | lthread | zappettini.com + cncprogramminghub.com + industrialmonitordirect.com + practicalmachinist.com (agree) | OK |
| G12.1 / G13.1 (Fanuc), G112 / G113 (Haas), X dia + C radius units on Fanuc, Haas G17 before | poly | Engrave-round rows (Haas G112 page official; Fanuc 2+ agree) | OK |
| Y axis on a multitask lathe moves in the current plane without extra codes | yflat | Machine specific | FLAGGED in program comment |
| Live tool / C axis codes | cface, yflat, poly | Round 29 rows | red settings |
| Indirect #[base+#i] assignment, WHILE/DO/END | drift | Round 25 rows (Haas official + Fanuc 2+) | OK |
| #3000 ≤ 26 characters on Fanuc, #3006 message stop | all | earlier rows | OK |

Our own defaults / methods (unsourced, shown as gray suggestions or stated in the program):
- Polygon rings: stepover = cutter radius; tool-center path, no comp.
- Y flats: 0.5 × cutter Z stepover, DOC per side × 2 in X per pass.
- Face bolt circle peck re-approach 0.02 in; clear Z 0.1 in.
- Thread start clearance 0.1 in on diameter; gray spring 1, min depth 0.002, finish allow 0.001, 60°, 600 RPM.
- Part present: two touch points, approach clearance 0.2, skip feed 10 in/min.
- Rotary centerline: alarm if the two top readings differ more than the expected gap + 1.
- Drift: simple moving average of the last N readings vs nominal.
- Feeds / RPM: 20 in/min and 3000 RPM load check, 1500 / 3000 live RPM, 4 / 10 in/min live feeds.

## Round 31 · Y-axis flats fix (Oct 13, 2026)

| Fact | Used by | Sources | Status |
|---|---|---|---|
| OD / radial milling on a Haas Y-axis lathe is done in G19 (Y-Z plane, X is depth); go back to G18 after; face milling uses G18, G112 face work uses G17 | yflat (gray hint only), Help | Morris-Trident live-tool lathe training (Haas-hosted pdf, haascnc.com/content/dam/haascnc/hfo-microsite/...) + Haas Factory Outlet "Live Tooling for Haas Lathes" (productivity.com) — agree | OK as a hint; the setting stays red |
| Fanuc: G17/G18/G19 select the plane; the lathe powers on in G18; a Y move works in any plane (plane matters for arcs, comp and cycles) | yflat | Fanuc 30i/31i common user's manual §7.4 (official, via cncmanuals.com) | OK |
| Fanuc Y-axis lathes: G19 for OD/side milling, G17 for face | yflat (Help text) | cncwebschool.com Y-axis lathe appendix + industrialmonitordirect.com (agree) | OK; mode-switch M-codes are builder-specific, so red |
| C clamp / unclamp M-codes are builder-specific (Haas M14 / M15 main spindle clamp) | yflat | Haas lathe programming workbook (official) + HFO pdf; Fanuc: IMD + Manual Guide i (parameter-set codes) | red setting, no default |

Not sourced, ours: Y sweep = half chord + cutter radius + 0.05 (shown as a check to compare with your Y travel); Z rows at 0.5 × cutter.

## Round 31 · batch 5 — builder jobs (Oct 13, 2026)

Rule here: every builder code is a red machine setting that starts empty. A gray hint is shown only when a source below gives it. Fanuc-style, Nakamura-Tome-style and Tsugami-style machines get no code hints (no public builder lists found).

| Fact | Used by | Sources | Status |
|---|---|---|---|
| Haas lathe M-codes: M10/M11 chuck, M36/M37 parts catcher, M104/M105 probe arm, M110/M111 secondary chuck | pcatch, ltset, subxfer (hints) | Haas lathe M-code list (official) haascnc.com/service/online-operator-s-manuals/lathe-operator-s-manual/lathe---m-codes.html; Haas M36/M37 page (official) | OK as hints |
| Haas G212 auto tool setting: T call first, H = tip direction (path depends on it), calibrate first | ltset | Haas G211/G212 page (official) haascnc.com/service/codes-settings.type=gcode.machine=lathe.value=G212.html | OK |
| Fanuc T-series G36 X / G37 Z: tool moves to the measuring position, difference added to the active offset; feed and ranges are builder parameters (6241, 6251–6255) | ltset | Fanuc 0i-B Descriptions §17.6 + 21i-TB operator's manual + 30i connection manual (official, via cncmanuals.com) | OK; measuring positions red |
| Haas G105 bar feed; no comment on the G105 line (alarm 314); I/J/K from #3100–#3102 | barloop | Haas G105 page (official) | OK |
| Haas M50 pallet change, P = pallet | palloop | Haas mill M50 page (official) | OK as hint |
| Haas G199 / G198 sync spindles; DS sub axis B; M110/M111 sub chuck in the transfer example | subxfer | Haas G199 page (official, incl. example program) | OK as hints |
| Haas G28 (machine zero); G53 X0 then Z0 to home a Haas lathe, G28 H0 unwinds C | shome, lhome | Haas mill G28 page + Haas G199 page example (official) | OK |
| Fanuc G28 via intermediate point: G91 G28 Z0. (mill), G28 U0. / W0. (lathe) | shome, lhome | Fanuc operator's manual (official) + helmancnc.com (agree) | OK |
| Lathe G10: Haas L10 geometry / L11 wear, U/W add; Fanuc G10 P(n) wear / P(10000+n) geometry, U/W add | lpwear, lawear | Haas lathe G10 page (official); helmancnc.com + mfgrobots.com Fanuc G10 articles (agree) | OK |
| Mill G10 L10–L13, R = value or increment, G91 = add | awear | Haas mill G10 page (official); Fanuc memory A/B/C rows from Round 30 | OK |
| Fanuc #1000–#1031 interface inputs (read-only, builder wires them) | swbar, sweject | Fanuc 30i connection manual (official) + zappettiniconsulting.com (agree) | OK; # red |
| Haas #11000–#11255 discrete inputs; G103 P1 to stop look-ahead reading ahead | swbar, sweject | Haas lathe macros chapter (official) | OK |
| #3001 ms timer settable to 0 | sweject | Round 29 rows | OK |
| Haas G04 P = seconds; Fanuc G04 P = milliseconds | pcatch, subxfer | Haas lathe workbook (official); Fanuc manual + helmancnc.com | OK |
| Tsugami warm-up: min. 15 min, spindle 2 min each 500→3000 then max, max travel each axis | swwarm (2 min gray) | Tsugami instruction manual (scribd copy) + Tsugami SS267/SS327 manual (manualmachine.com) | OK for steps; FLAG: one Tsugami manual says clamp a work-piece, the other says no bar during warm-up — program says "per your manual" |
| Swiss re-chuck / bar advance and bar change codes | swmulti | Only one source family (industrialmonitordirect.com) describes a sequence; codes vary by builder | FLAGGED: both codes red, sequence is just "your code" lines |
| Multi-path Swiss wait / sync codes | swmulti | Builder-specific | SKIPPED — not written, stated in the program |
| Nakamura-Tome sub-spindle / sync codes, Tsugami part eject / bar-end wiring | subxfer, swbar, sweject | No public source found | red, no hint |

Our own defaults (unsourced, gray or stated in the program):
- Part-off: clearance 0.2 on diameter, 800 RPM, 0.002 in/rev, catcher dwell 1 s.
- Sub-spindle: grip feed 20 in/min, clamp dwell 0.5 s, part-off feed 0.002 in/rev, part-off start = bar + 0.2.
- Lathe probe: clearance 0.1, skip feed 10 in/min; measured Ø = skip X − tip (assumes skip X reads diameter and the probe is calibrated).
- Warm-up step time from distance ÷ feed (no timer).
- Wear signs: boss big → D smaller, pocket big → D bigger, floor high → H wear down; lathe OD / ID / face: wear += nominal − measured.

## Round 32 · Thin-source suggestions (amber)

New rule (Kori): if sources are thin, show what they say as an amber hint with "Thin source — verify on your machine", the source count and links. Amber hints never fill a field or write anything, and red settings stay red.

| Item | What the amber hint says | Sources (count) | Shown where |
|---|---|---|---|
| Fanuc lathe G87 / G88 | side drilling / side tapping, G80 cancels (lathe only) | Fanuc 0i-F lathe operator manual (drivesul.com.br copy) + helmancnc.com (2) | Help › colors |
| Fanuc G34 | G34 X Z F K, K = lead change per rev | Fanuc 0i-F lathe manual + machinemfg.com + industrialmonitordirect.com (3) | Help › colors |
| M07 | Haas = shower; Fanuc-style mist = builder's choice | Haas mill M-code list (1) | Help › colors |
| Fanuc #3002 | manual: only while cycle start lamp on; MMS: always runs (disagree) | 2, disagreeing | Help › colors |
| Fanuc ATAN range | 0–360 per one source; job normalises | 2 for form, 1 for range | rotp, a4p (Fanuc) |
| Fanuc lathe G18 / G97 / G99 | same as Haas, in the 0i-F G-code table (system A) | Fanuc 0i-F lathe manual (1) | mgroove, lpeck, ltaper, cdrill (Fanuc) |
| Fanuc lathe G98 live tool | per minute in system A; B/C differ | Fanuc 0i-F lathe manual (1) | cdrill (Fanuc) |
| Swiss re-chuck / bar advance | sequence only; codes are the builder's | industrialmonitordirect.com (1 family) | Swiss setting + swmulti |
| Swiss bar change | builder macro tied to bar feeder and bar-end signal | same (1 family) | Swiss setting + swmulti, swbar |
| Tsugami warm-up bar in bushing | two Tsugami manuals disagree | 2, disagreeing | swwarm (Swiss) |
| Fanuc multi-path wait M-codes | range in params 8110/8111, M__ P__, both paths need it | Fanuc 30i/31i parameter manual + user manual (cncmanuals.com copies, official, 30i not 0i) | swmulti, subxfer (Swiss); not written — app makes one-path programs |

Zero public sources (no hint, user types it): Fanuc spindle load variable; Fanuc look-ahead fix; Nakamura-Tome M-codes; Tsugami M-codes; wear sign convention for automatic wear update.

## Round 33 · batch 6 (Oct 13)

The research file's snippets were re-checked by opening the pages: the Renishaw manual PDF (downloaded, read with pdftotext), the zappettiniconsulting.com page, and the Haas basic programming page.

| Fact used | Sources | Used in |
|---|---|---|
| G65 P9832 / P9833 probe on / off | Renishaw Inspection Plus manual H-2000-6222 (haascnc.com copy, official) + zappettiniconsulting.com/wiki/haas-renishaw-inspection | all probe jobs |
| G65 P9810 X Y Z F [M1.]: stops with PATH OBSTRUCTED; M1. = flag only (#198 = 7 on Haas); F modal; do not exceed the safe feed set at installation | same 2 | ppos |
| Tool length (G43) must be on before cycles | zappettini (alarm 89) + manual examples | all probe jobs |
| G65 P9819 C D K (bore) / Z (boss) [A B H M]; starts at PCD centre; nests 4 deep | manual (official) + zappettini | ppcd |
| G65 P9820 Z I J pairs (up to 6 points) U = max stock; no S, so no offset is set | manual + zappettini | pstock |
| G65 P9801 Z T, P9802 D (bore with exact centre), P9803 D (ring gauge), in that order | manual + zappettini | pcal |
| G65 P9814 D [Z]: no Z = bore; G65 P9834 with no inputs stores feature 1, then X Y = nominal incremental distance + H | manual + zappettini | pdist |
| Safe startup line G00 G90 G17 G40 G49 G54 after every tool change | Haas mill operator manual, Basic Programming (official); the app adds G80 like its other safe starts | sstart |
| Lathe G18 / G97 / G99 safe start | Round 28 rows (Haas official; Fanuc is amber) | lstart |
| Trochoidal slot, sphere, ellipse, polygon | geometry only (no control-specific codes beyond G01/G02/G03/G43) | troch, sphcap, ellip, polyb |

Amber (thin): Renishaw output / calibration variable numbers differ by control (only zappettini gives the Haas vs Fanuc table). The app does not read them, except for the Flag # in ppos flag mode, which the user types (Haas manual: #198).

Our own defaults (unsourced, shown gray or stated in the program): gray feed / RPM / clear Z (the app's usual starting values); trochoidal and polygon-pocket helix = one turn per step-down level; the helix starts 0.02 above the previous level; entry 0.1 + tool radius outside on ellipse / polygon boss; polygon pocket helix radius = min(half the tool radius, pocket); 'First flat angle' 0 and the Renishaw default A0 (that one is from the manual).
Skipped: ellipse pocket (concentric ellipse offsets self-intersect; contour only — rough with the circular / rectangular pocket jobs); X/Y-surface stock checks (Z only); vector calibration O9804.

## Round 34 · batch 7 (Oct 13)

Pages opened and read this round: Renishaw contact tool-setting manual H-2000-6223 (haascnc.com PDF, pdftotext), Renishaw Inspection Plus manual (O9835, settings macro O9724 #170), Haas mill Macros chapter (variable table), Haas mill G47 page (G47 + G107 example), Fanuc 30i/31i user manual modal-information page (cncmanuals.com), zappettiniconsulting.com Fanuc system variables, a CNCzone thread on #4120.

| Fact used | Sources | Used in |
|---|---|---|
| G65 P9851 T [S]: length after you jog about 10 mm / 0.4 in above the stylus; G65 P9852 S D: diameter | Renishaw tool-setting manual (official) | tsman |
| G65 P9853 B1/2/3 T(.ttt) H M: M = spare offset set to 1 when out of tolerance (no BROKEN TOOL alarm), 0 when OK; the cycle ends with G28 | same | tsauto |
| Flag read from the offset variable (Haas #2000+H; Fanuc by memory type) | Round 26 rows | tsauto |
| Flag-only mode: #170 = 7 / 23 in O9724 (install setting); #198 flag | Renishaw Inspection Plus manual (official) + zappettini Haas page | pflag |
| G31 skip; #5063 in work coordinates with the length offset (Haas page says so); G10 offset write | Haas Macros page (official) + Round 25 / 27 rows | g31z |
| G65 P9835 T M V C (C default 3); measuring cycle without T before it; spare pair set to 0 first; radius register unless Z | Renishaw Inspection Plus manual (official) | spcavg |
| Haas #5601–#5699 tool life limit, #5701–#5800 counter, #3026 tool in spindle | Haas mill Macros variable table (official) | hlife, tlog |
| Fanuc #4120 = modal T of the buffered block | Fanuc 30i/31i user manual (official copy) + zappettini Fanuc variables; CNCzone: not the spindle tool on swing-arm changers | tlog (amber) |
| G47 P0 / P1 (####) X Y I J R Z F E; G107 A0. Y0. R; G187 P3 E0.002 / G187; order G107 → G47 → G107 | Haas mill G47 page (official) | g47w |
| G12.1 / G112 polar interpolation, X dia / C radius (Fanuc), G17 + G112 / G113 + G18 (Haas) | Round 30 polygon rows | xcpock |

Amber (thin): Renishaw setter macros (one manual; WIPS may differ; rotating speed from the macro settings); Fanuc #4120 meaning; X-C face pocket (no worked public example; codes from the polygon job); O9835 radius-only.
Our own defaults (unsourced): gray feeds / RPM (G47 30 / 10 follow the Haas example values); G31 approach at 5× skip feed; ramp entry along X on the face pocket and the 0.02 restart above the previous level; tool-life "near end" uses the % you type.
Not built / limited: Haas tool life for tools 100–200 (Haas lists the limit only to #5699); Fanuc tool life (option-specific variables, zero public sources checked); face pocket off-center (pocket is centered on the spindle).

## Round 35 — batch 8: 5-axis mills (v2.6, sw mc-v40)

Opened and checked 2026-10-13.

| Item | Source | Type | Used for |
|---|---|---|---|
| Haas G234 TCPC (H on same block, cancel G49/G43/G44, rotaries at 0 first, no rapid rotary moves, not with G254) | https://www.haascnc.com/service/codes-settings.type=gcode.machine=mill.value=G234.html | official | gray hint, Help |
| Haas G254 / G255 DWO (3+2 only, work offset first, rotary motion done first, XY then Z after, G53 retract before rotary moves, UMC uses B tilt / C rotary) | https://www.haascnc.com/service/codes-settings.type=gcode.machine=mill.value=G254.html | official | gray hint, unwind order, B/C preset naming |
| Haas G268 / G269 feature coordinate system (G43 before G268; G268 X Y Z [I J K Q]; recall XY/Z after; G268 before G234) | https://www.haascnc.com/service/codes-settings.type=gcode.machine=mill.value=G268.html | official | 3+2 wrapper, tilted-face drilling (Haas) |
| Haas M12 / M13 5th-axis brake (M10 / M11 4th already logged) | https://www.haascnc.com/service/codes-settings.type=mcode.machine=mill.value=M12.html | official | gray hint for clamp codes |
| Fanuc G68.2 X Y Z I J K (Euler Z, X', Z''), G53.1 own block after G68.2, G69 cancel (M) | Fanuc 30i/31i/32i-MA user manual p.709 (cncmanuals.com copy) http://cncmanuals.com/fanuc/773/30i-300i-300is-ma-31i-310i-310is-ma-a5-32i-320i-320is-ma-common-to-lathe-machining-center-users-manual/page/743 ; agrees: https://zappettiniconsulting.com/wiki/fanuc-tilted-working-plane-g682 , https://forum.cgtech.com/viewtopic.php?id=303 | official (30i) + 2 agreeing | 3+2 wrapper, tilted faces (Fanuc). Length comp off before G68.2 (Zappettini PS5462; eMastercam thread agrees G43 after G53.1, G49 before G69) |
| Fanuc G43.4 type 1 / G43.5 type 2 TCP, G49 cancel | Fanuc 30i-A TCP additional manual (cncmanuals.com copy) http://www.cncmanuals.com/fanuc/609/series-30i-model-a-tool-center-point-control-for-5-axis-machining-additional-manual/page/10 ; https://zappettiniconsulting.com/wiki/fanuc-tcp-tool-center-point | official (30i) + 1 | gray hint, unwind cancel |

Amber (thin):
- `f0i5` — Fanuc 0i availability of G68.2 / G43.4 is model/option dependent; sources are 30i manuals. Fanuc G28 on roll-over rotaries.
- `rcc` — the bore-at-0°/180° midpoint check is our own simple method (no public worked example found agreeing in 2 places); builder MRZP routines (Haas VPS/WIPS) differ. Job only reports.

Never guessed / always red: kinematics, axis letters (prefilled from preset name but still red), limits, + directions, pivot/MRZP offsets, all code lines, option yes/no, Fanuc clamp M-codes (no public source — builder specific).
Unsourced defaults (gray): tilted-face drill feed 6, RPM 2000, start angle 0; centerline check skip feed 10, over-travel 0.1.

## Round 36 — cycles, strategies, optimization, calculators (Oct 13, 2026)
All rewritten in our own words; generic Haas / Fanuc 0i only.
- Haas lathe G71 / G72 / G76 (official haascnc.com G-code pages): one-block D form, U/W allowances, P modal caution, Type I vs II; G76 A, D, K, P1–P4 infeed, Settings 86/95/96/99.
- Fanuc turning G71/G72/G70/G76/G74/G75 + G-code system A/B/C table: zappettiniconsulting.com Fanuc turning page; agrees with the Fanuc 30i manual p.45 (official, cncmanuals.com copy: G50→G92 in B/C, G70–G76 → G72–G78 in C).
- Fanuc G05.1 Q1/Q0 (30i manual p.540, official). R level + G43/G49 ordering: Doosan/Fanuc PDF + Practical Machinist thread → THIN (amber).
- Haas mill G150, G187, G77, G83 (I J K, Setting 52), G12/G13, G70/G71/G72 bolt patterns (official Haas pages). G72 "does L count the start hole" → THIN.
- Fanuc G87 back boring: Power Mate i manual (official) + 21i parameter manual (5101 RD1/RD2) + Practical Machinist + blog.
- Plunge milling: Sandvik Coromant plunge-milling page (75%/50% step, hook retract, no drill cycle, fz table).
- Chip thinning / peel: Harvey Performance chip-thinning article + Make It From Metal (same formula, 2 independent).
- Ramping / helix: Harvey ramping article + Haas/forum helix pitch (Z per rev = π·D·tan a).
- Face milling patterns: Sandvik face-milling page + Sandvik trajectory article + Caltech machine-shop PDF (agree → not thin).
- THIN (amber, never auto-filled): high-feed lead angle (one page), Taylor n (one calculator page), Fanuc AICC R level, Haas T pre-staging, Haas G72 start-hole count, Haas lathe G73/G74/G75 (not built), adaptive feed by spindle load (builder option).
- Unsourced defaults (gray, editable): G71/G72 retract 0.02, allowances 0.02/0.005, feeds 0.01/0.005, SFM 400; start point = stock + 0.1 dia; plunge feed 4, peel chip load 0.002; back bore Start Z 0.1.

## Round 37 — lathe cycles & checks, roll-in, corner rest (Oct 13, 2026)
- Haas lathe G73 / G74 / G75 (official haascnc.com pages, opened): G73 P Q D I K U W F (D whole number, I radius), G74 X Z I(diameter) K F (D warning, Setting 22), G75 X Z I(radius) K F. Official → gray hints; still flagged "verify" in Help per Kori.
- Fanuc G73 two-block U W R / P Q U W F: mentorcnc.com, mfgrobots.com, gcodetutor.com, kezuriba.net (agree). Fanuc G74/G75 R / X Z P Q F, P/Q no decimal: Zappettini Fanuc turning page (Round 36). Fanuc G74 P radius-vs-diameter not stated clearly → we write the X shift as radius; verify.
- G92 thread cycle (system A / Haas) and B/C = G78: Fanuc 30i manual p.45 (Round 36 source).
- Thread tables: Wikipedia UTS + ISO metric pages and engineeringtoolbox UNC/UNF + ISO 724 pages agree on major Ø and pitch (UNC/UNF #4–1-1/2, metric coarse M3–M48). Thread depth disagrees (0.541·P basic vs 0.614·P) → height stays user-entered.
- Torque-limit skip G31 P99 / P98: Fanuc 21i-TB operator manual p.88–89 (official copy) — torque limit must be set first, no consecutive G31 P99 blocks. Pickup check and cut-off confirmation method: PMPA Tsugami macro presentation + Practical Machinist G31 torque skip thread → THIN, high risk. Haas: no documented sub-spindle torque skip → refused.
- Setter breakage check: G212 (Haas) / G36 G37 (Fanuc) official from earlier rounds; compare-offset method from Practical Machinist breakage macro thread → THIN.
- Bar last part: builder logic → THIN; Haas G105 page.
- Spindle load watch: Haas macros chapter #1098; Fanuc var builder-specific → red + THIN.
- Arc roll-in: Sandvik face-milling page + Caltech PDF (Round 36). Corner rest plunge: Sandvik plunge milling + shop practice → THIN.
- Unsourced defaults (gray): G74/G75 retract 0.01, feeds 0.002–0.003/rev, RPM 600; G92 min depth 0.002, depth schedule first·√n; load watch feed 0.008; crest hook 0.02, plunge feed 4; roll-in feed 20.

## Round 38 — held-back risky jobs (Oct 13, 2026)
- Haas M19 P/R orient (official mill + lathe M19 pages): option needed; without it M19 goes to zero only; range 0–360.
- Fanuc orient by parameter write G10 L50 N____ P1 R____ / G11, ~1 s wait before M19: Practical Machinist "18i-mb spindle orientation with G10" + Industrial Monitor Direct articles (machine-written, counted as one source). Parameter number (4077 / 4031 / builder) → red; original value typed by the user and written back (older controls cannot read parameters; PRM[] only on newer). THIN.
- Lathe keyway broach macro (passes from start/end Ø, DOC, G98 feed, C mode + brake, back off X before return): CNC Broach Tools Fanuc lathe example (DMG Mori). C-indexed spline broach: same + Fanuc C positioning. THIN, builder codes red.
- Hobbing sync G81 T L (sign of L = C direction), G80 cancel; Q/P for helical; option: Fanuc 16i/18i-B connection manual p.289, 0i-MC EGB addendum, 15i-MA manual (official copies). Live-tool hob setup is builder-specific → red option + sync code; Haas refused (nothing documented).
- Hex by synced G32: Practical Machinist macro archive (one author) → THIN; X-only lead convention (radius per turn) not verified → amber; Haas refused.
- Unsourced defaults: Fanuc 1 s dwell after G11 (forum), knurl/broach overrun 0.1, clear Z 0.5, hex 6 segments per flat, hob 2 s settle dwell.

## Round 39 — research round 4: 35 jobs (Oct 13, 2026)
Rule: official docs, or 2+ independent unofficial sources that agree; single-source items carry the amber "verify on your machine" caution. All in our own words; generic Haas / Fanuc 0i only. I/O numbers, M-codes, positions, limits and offsets are typed by the user (red); HIGH-risk jobs need a typed risk confirm.
- Haas Mill Operator's Manual, Macros chapter (official, re-opened this round): https://www.haascnc.com/service/online-operator-s-manuals/mill-operator-s-manual/mill---macros.html — inputs #11000–#11255, outputs #12000–#12255, G103 P1 output-pulse example, #1064–#1068 max axis loads, #2001–#2800 tool offsets, #3004 feed-hold bit map (resets at M30), #3020–#3025 timers, #3030 / #3032 / #3033 single block / block delete / opt stop, #3901 / #3902, #5041 work position, #5221+ work offsets, #6198 = 1000000 on NGC, #7501–#7806 pallet priority / status / program / usage, #8500–#8515 ATM, #13013 coolant level, #14001+ G154 P1–P99, #50001+ tool type (7 = probe), #56701+ max RPM per tool; aliasing O9010–9019 G / O9000–9009 M (M aliases cannot pass arguments; read #4101–#4126); G65 at a jogged spot (add-a-clamp example); block delete "/".
- Haas G10, G234 (rotaries at 0 first, no rapid rotary moves, not with G254), G254 / G255 DWO, G268 / G269 (G43 first) code pages (official) — see research file links.
- Renishaw "Inspection software for lathes" H-2000-6021 (official manual copy) + Renishaw inspection software page: lathe probe calibration, rib / groove width, Z face work shift with sign test, % feedback + step limit. Off-centre face bore: this manual only → THIN.
- Renishaw AxiSet Check-Up page: pivot sphere check idea; our Z-only, report-only reduction → THIN.
- Zappettini, Fanuc PMC for programmers (cites Fanuc B-64724EN): #1000–#1031 UI, #1100–#1131 UO, #1032 32-bit read → Fanuc I/O jobs and fixture ID; output timing vs dwell not documented → THIN on Fanuc.
- NIST/SEMATECH handbook 6.1.6 process capability: Cp, Cpk, Cpm formulas, small-sample warning. oee.com: OEE = availability × performance × quality (single source, standard formula) → THIN.
- Refused (not written): Fanuc — DWO, G268, per-tool RPM, tool type, coolant level, run-mode guard, #6198 branch, pallet pool, shift report timers, axis load, ATM, maintenance by hours; Haas — fixture ID, lathe Z-face work shift (WIPS); all lathes — work-offset copy / shift (axis order of lathe offset variables not opened).
- Unsourced defaults (gray): probe clearance 0.05–0.1, skip feed 10, input poll dwell 0.1 s, G83 peck = depth/4 (min 0.05), Haas probe tool type 7 (official table).

## Round 54 — DXF import, phase 1 (Oct 13, 2026)
Single-source items from the research file, now checked against 2+ public sources:
- **$ACADVER version codes** (AC1009 = R11/R12, AC1012 = R13, AC1014 = R14, AC1015 = 2000, AC1018 = 2004, AC1021 = 2007, AC1024 = 2010, AC1027 = 2013, AC1032 = 2018): Autodesk DXF Reference, HEADER Section Group Codes (help.autodesk.com, 2024); Autodesk support article "Drawing format version codes for AutoCAD"; AutoXchange "Versions of AutoCAD" (tailormade.com). All three agree. AC1032 still covers 2018–2024, so "newer than AC1032" is refused as unknown.
- **Binary DXF sentinel** = 22 bytes "AutoCAD Binary DXF" CR LF SUB NUL: Autodesk DXF Reference "About Binary DXF Files" (2018); UK National Archives PRONOM signature (BOF "AutoCAD Binary DXF"); dxfbin crate source (sentinel test, 22 bytes); LibreDWG compare_dxfb.py. Agree.
- **Polyline bulge** = tan(included angle / 4), negative = clockwise, 0 = straight, 1 = semicircle: Autodesk ActiveX SetBulge / GetBulge (2024, 2025); Lee Mac "Bulge Conversion Functions" (radius = chord·(1 + b²) / (4·|b|), center from the chord); autodesk.autocad.customization thread quoting the DXF reference. Agree. Our center formula (mid-chord + left normal · (c/2)·(1 − b²)/(2b)) is checked in test/dxf/ref-check.js against b = 1 (semicircle), tan(22.5°) (90° arc) and −0.5 (sagitta |b|·c/2).
- $INSUNITS (0 unitless, 1 in, 4 mm …): Autodesk HEADER Section page + ezdxf "DXF Units" (research file). Used only as a gray suggestion; the user picks units and checks one known size.
- Entity group codes (LINE 10/20/30 11/21/31, ARC/CIRCLE 10/20/40/50/51, LWPOLYLINE 90/70/10/20/42/38, POLYLINE + VERTEX 70 flags 8/16/64, INSERT 2/10/20/41/42/50/70/71/44/45, extrusion 210/220/230): Autodesk DXF Reference entity pages + ezdxf entity docs; cross-checked by parsing our own fixtures with dxf-parser 1.1.2 (MIT, test reference only, not shipped) — entity, vertex and bulge counts match (test/dxf/ref-check.js).
- No library shipped: our reader is ~10 KB raw. dxf-parser is used only by the Node reference check.
- Defaults (gray, shown): join tolerance 0.001 in / 0.02 mm (research file, common CAM default); 5 MB / 50,000-shape cap.

## Round 55 — DXF import, phase 2 (Oct 13, 2026)
- **G71 Type I / Type II and the P block**: Haas lathe G71 code page (official: Type 1 when the P block has X only, Type 2 when it has X and Z; Z may never change direction in either type; P block G00 = rapid along the clearance plane, G01 = G71 feed); CNCCookbook "G71 Rough Turning Cycle" and "G71 Type 2" (monotonic in X for Type I, monotonic in Z always); Industrial Monitor Direct "Fanuc G71 cycle" (X-only first block = Type I; Type II needs parameter 16 bit 6 on some 0i, alarm 0031-style "not monotonic"); Mentor CNC "G71 Type I/II" (same rule from the old Fanuc manual). Four sources agree. We write N10 **G01 X only** (no rapid inside P–Q) and refuse Z reversals and X reversals (Type II not written — its enable parameter and pocket limits differ by control).
- Haas one-block G71 P Q D U W F vs Fanuc 0i two-block G71 U R / G71 P Q U W F: reused from Round 36 (Haas G71 page; Fanuc 0i-TD manual copy).
- Tool nose comp G42 on before G71, G40 after: research file [12][13] (Haas G71 troubleshooting PDF + Practical Machinist thread).
- Lathe arcs: G02 / G03 written as seen with +X up and +Z to the right (standard G18 view, right-handed, viewer on +Y). Common convention; dry-run note in Help.
- Bolt circle fit: least-squares circle (Kasa), equal spacing within 0.05°; grid: X / Y clusters with equal pitch; slot: 2 equal parallel lines + 2 half arcs. Our own math, checked by ui-test41 fixtures.

## Round 56 — DXF import phase 3 (curves, pockets with islands, 3+2 faces)
- ELLIPSE group codes (10 center, 11 major-axis endpoint relative to center, 40 minor/major ratio, 41/42 start/end parameter): Autodesk DXF Reference "ELLIPSE (DXF)" and the ezdxf ELLIPSE docs. Both agree.
- SPLINE group codes (70 flags, 71 degree, 72/73/74 knot/control/fit counts, 40 knots, 41 weights, 10 control points, 11 fit points): Autodesk DXF Reference "SPLINE (DXF)" and the ezdxf SPLINE docs. Both agree. We evaluate with the standard de Boor algorithm (rational when weights are given). A spline that has only fit points is passed through those points with a Catmull-Rom curve, and the UI says so.
- Arc fitting: our own greedy fit with a binary search. A segment is kept only if every sample and every chord midpoint is within the shown tolerance. Arcs are kept under 180° so the R-word stays unambiguous.
- Pocket clearing: our own zig-zag scan-line method. The tool center stays at least r + allowance from every wall (exact distance to lines and arcs), and rows only link when the link move is clear. G41/G42 finish passes run on the outer wall and on each island. No library shipped. We looked at Clipper2 (Boost license, MIT-compatible) and decided it wasn't needed. Nothing AGPL is used.
- 3+2: the face feature is written as a plain subprogram (M98/M99), called by the existing 3+2 wrapper. Plane, tool, and TCP are left to that wrapper. Using cutter comp in a tilted plane depends on the control, so the code carries a caution line.
