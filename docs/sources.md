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
