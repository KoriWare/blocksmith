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
