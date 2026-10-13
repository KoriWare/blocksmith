# Makes our own test drawings (all geometry invented here, nothing from any real part). Run: python3 make_fixtures.py
import math, os, json
D=os.path.dirname(os.path.abspath(__file__))
def P(*pairs): return ''.join(f'{c}\n{v}\n' for c,v in pairs)
def hdr(ver=None, ins=None):
    s=P((0,'SECTION'),(2,'HEADER'))
    if ver: s+=P((9,'$ACADVER'),(1,ver))
    if ins is not None: s+=P((9,'$INSUNITS'),(70,ins))
    return s+P((0,'ENDSEC'))
def layers(names):
    s=P((0,'SECTION'),(2,'TABLES'),(0,'TABLE'),(2,'LAYER'),(70,len(names)))
    for n,c in names: s+=P((0,'LAYER'),(2,n),(70,0),(62,c),(6,'CONTINUOUS'))
    return s+P((0,'ENDTAB'),(0,'ENDSEC'))
def line(a,b,ly='0',z=0): return P((0,'LINE'),(8,ly),(10,a[0]),(20,a[1]),(30,z),(11,b[0]),(21,b[1]),(31,z))
def circ(c,r,ly='0',ext=None):
    s=P((0,'CIRCLE'),(8,ly),(10,c[0]),(20,c[1]),(30,0),(40,r))
    if ext: s+=P((210,ext[0]),(220,ext[1]),(230,ext[2]))
    return s
def arc(c,r,s0,e0,ly='0',ext=None):
    s=P((0,'ARC'),(8,ly),(10,c[0]),(20,c[1]),(30,0),(40,r),(50,s0),(51,e0))
    if ext: s+=P((210,ext[0]),(220,ext[1]),(230,ext[2]))
    return s
def lw(pts,closed=True,ly='0'):
    s=P((0,'LWPOLYLINE'),(100,'AcDbEntity'),(8,ly),(100,'AcDbPolyline'),(90,len(pts)),(70,1 if closed else 0))
    for p in pts:
        s+=P((10,p[0]),(20,p[1]))
        if len(p)>2 and p[2]: s+=P((42,p[2]))
    return s
def pl12(pts,closed=True,ly='0',flags=None):
    s=P((0,'POLYLINE'),(8,ly),(66,1),(10,0),(20,0),(30,0),(70,flags if flags is not None else (1 if closed else 0)))
    for p in pts:
        s+=P((0,'VERTEX'),(8,ly),(10,p[0]),(20,p[1]),(30,p[3] if len(p)>3 else 0))
        if len(p)>2 and p[2]: s+=P((42,p[2]))
    return s+P((0,'SEQEND'),(8,ly))
def text(p,t,ly='TEXT'): return P((0,'TEXT'),(8,ly),(10,p[0]),(20,p[1]),(30,0),(40,0.125),(1,t))
def dim(ly='DIM'): return P((0,'DIMENSION'),(8,ly),(2,'*D1'),(10,0),(20,0),(30,0))
def ents(body): return P((0,'SECTION'),(2,'ENTITIES'))+body+P((0,'ENDSEC'))
def blocks(body): return P((0,'SECTION'),(2,'BLOCKS'))+body+P((0,'ENDSEC'))
def block(name,base,body): return P((0,'BLOCK'),(8,'0'),(2,name),(70,0),(10,base[0]),(20,base[1]),(30,0),(3,name))+body+P((0,'ENDBLK'),(8,'0'))
def insert(name,p,sx=1,sy=1,rot=0,ly='0',cols=None,rows=None,cs=0,rs=0):
    s=P((0,'INSERT'),(8,ly),(2,name),(10,p[0]),(20,p[1]),(30,0),(41,sx),(42,sy),(50,rot))
    if cols: s+=P((70,cols),(71,rows),(44,cs),(45,rs))
    return s
EOF_=P((0,'EOF'))
def write(n,s,crlf=False):
    if crlf: s=s.replace('\n','\r\n')
    open(os.path.join(D,n),'w',newline='').write(s)

# 1 R12 plate, unitless (R12 has no $INSUNITS), drawn away from 0,0 at (10,5): 4 x 3 rectangle from LINEs,
#   4 corner holes 0.257, 6-hole bolt circle 0.201 on 2.0 dia at plate center, obround slot as R12 POLYLINE with bulges,
#   text + dimension + far-away title border (layer TITLE)
ox,oy=10,5
b=''
R=[(ox,oy),(ox+4,oy),(ox+4,oy+3),(ox,oy+3)]
for i in range(4): b+=line(R[i],R[(i+1)%4],'PART')
b+=line(R[0],R[1],'PART')   # duplicate line on purpose
for (x,y) in [(.375,.375),(3.625,.375),(3.625,2.625),(.375,2.625)]: b+=circ((ox+x,oy+y),0.257/2,'HOLES')
for k in range(6):
    a=math.radians(15+60*k); b+=circ((ox+2+math.cos(a),oy+1.5+math.sin(a)),0.201/2,'HOLES')
b+=pl12([(ox+0.8,oy+2.5,0),(ox+1.6,oy+2.5,1),(ox+1.6,oy+2.75,0),(ox+0.8,oy+2.75,1)],True,'PART')  # obround 0.25 wide, ends semicircles
b+=text((ox,oy-0.5),'PLATE A - OUR TEST'); b+=dim()
T=[(-20,-20),(40,-20),(40,30),(-20,30)]
for i in range(4): b+=line(T[i],T[(i+1)%4],'TITLE')
write('plate_r12.dxf', hdr('AC1009')+layers([('PART',7),('HOLES',1),('TEXT',2),('DIM',3),('TITLE',4)])+ents(b)+EOF_, crlf=True)

# 2 2018 mm plate: 100 x 60 LWPOLYLINE with R5 rounded corners (bulge tan(90/4)), 2x3 grid of 6.6 holes,
#   a block BOSS (circle 20 + square island) inserted rotated 30 deg, an INSERT array of 3 small holes
t=math.tan(math.radians(90)/4); W,H,r=100,60,5
pts=[(r,0,0),(W-r,0,t),(W,r,0),(W,H-r,t),(W-r,H,0),(r,H,t),(0,H-r,0),(0,r,t)]
b=lw(pts,True,'OUTLINE')
for i in range(3):
    for j in range(2): b+=circ((20+30*i,15+30*j),3.3,'HOLES')
bl=block('ISL',(0,0),circ((0,0),6,'0'))
bl+=block('PIN',(0,0),circ((0,0),1.5,'0'))
b+=insert('ISL',(50,30),1,1,30,'ISLAND')
b+=insert('PIN',(35,52),1,1,0,'HOLES',cols=3,rows=1,cs=15,rs=0)
b+=text((0,-8),'MM TEST PLATE')
write('plate_2018_mm.dxf', hdr('AC1032',4)+layers([('OUTLINE',7),('HOLES',1),('ISLAND',5),('TEXT',2)])+blocks(bl)+ents(b)+EOF_)

# 3 open contour with a 0.01 gap, a duplicated segment, a branch, plus a 0.0005 near-miss that the join tolerance closes
b=line((0,0),(2,0))+line((2,0),(2,1))+line((2,1),(0,1))+line((0,1),(0,0.01))     # gap 0.01 at (0,0)
b+=line((2,0),(2,1))                                                              # duplicate
b+=line((5,0),(7,0))+line((7,0),(7,1))+line((7,1),(5,1))+line((5,1),(5,0.0005))  # closes within 0.001
write('open_gap.dxf', hdr('AC1015',1)+ents(b)+EOF_)

# 4 binary DXF sentinel only
open(os.path.join(D,'binary.dxf'),'wb').write(b'AutoCAD Binary DXF\r\n\x1a\x00'+bytes(range(40)))
# 5 DWG header
open(os.path.join(D,'part.dwg'),'wb').write(b'AC1032'+bytes(64))
# 6 tilted / 3D
b=line((0,0),(1,0))+circ((3,3),0.5,'0',(0.7071,0,0.7071))+line((0,0,),(1,1),'0',z=1.0)+arc((5,5),1,0,90,'0',(0,0,-1))
write('tilted.dxf', hdr('AC1015',1)+ents(b)+EOF_)
# 7 3D solid
write('solid3d.dxf', hdr('AC1027',4)+ents(line((0,0),(1,0))+P((0,'3DSOLID'),(8,'0'),(1,'ACIS DATA')))+EOF_)
# 8 newer than 2018 / older than R12
write('old_r10.dxf', hdr('AC1006')+ents(line((0,0),(1,0)))+EOF_)

# 9 lathe half profile (inches, X = drawing Y radius, Z = drawing X): face at Z0 from center, 0.03 chamfer, 1.0 OD, step to 1.5 OD with R0.06 fillet, back face
c=0.03; r=0.06
seg=line((0,0),(0,0.5-c),'PROF')+line((0,0.5-c),(-c,0.5),'PROF')+line((-c,0.5),(-1.0,0.5),'PROF')
seg+=line((-1.0,0.5),(-1.0,0.75-r),'PROF')+arc((-1.0-r,0.75-r),r,0,90,'PROF')+line((-1.0-r,0.75),(-2.0,0.75),'PROF')+line((-2.0,0.75),(-2.0,0),'PROF')
seg+=line((0.2,0),(-2.4,0),'CENTER')
write('lathe_half.dxf', hdr('AC1015',1)+layers([('PROF',7),('CENTER',1)])+ents(seg)+EOF_)
# 10 lathe with an undercut groove (X goes back down = Type II)
seg=line((0,0),(0,0.5),'PROF')+line((0,0.5),(-0.6,0.5),'PROF')+line((-0.6,0.5),(-0.6,0.4),'PROF')+line((-0.6,0.4),(-0.8,0.4),'PROF')+line((-0.8,0.4),(-0.8,0.5),'PROF')+line((-0.8,0.5),(-1.5,0.5),'PROF')+line((-1.5,0.5),(-1.5,0),'PROF')
write('lathe_groove.dxf', hdr('AC1015',1)+layers([('PROF',7)])+ents(seg)+EOF_)
# 11 lathe Z reversal (back taper toward the face)
seg=line((0,0),(0,0.4),'PROF')+line((0,0.4),(-0.5,0.4),'PROF')+line((-0.5,0.4),(-0.3,0.6),'PROF')+line((-0.3,0.6),(-1.2,0.6),'PROF')+line((-1.2,0.6),(-1.2,0),'PROF')
write('lathe_zrev.dxf', hdr('AC1015',1)+layers([('PROF',7)])+ents(seg)+EOF_)

# 12 bolt circle + grid + slot (lines + arcs) for phase 2 detection, inches
b=''
for k in range(8):
    a=math.radians(22.5+45*k); b+=circ((math.cos(a)*1.5,math.sin(a)*1.5),0.1405,'H')
for i in range(4):
    for j in range(3): b+=circ((4+0.5*i,-1+0.75*j),0.0625,'H')
b+=line((-1,3),(1,3),'S')+arc((1,3.25),0.25,270,90,'S')+line((1,3.5),(-1,3.5),'S')+arc((-1,3.25),0.25,90,270,'S')
for k in range(3):   # partial arc pattern (not equal around 360)
    a=math.radians(10+20*k); b+=circ((8+math.cos(a),math.sin(a)),0.05,'H')
write('patterns.dxf', hdr('AC1024',1)+ents(b)+EOF_)

# 13 spline + ellipse + pocket with islands (phase 3), inches
b=''
# pocket outline 4 x 2.5 rectangle, island circle and island rounded square
b+=lw([(0,0),(4,0),(4,2.5),(0,2.5)],True,'POCKET')
b+=circ((1.0,1.25),0.35,'POCKET')
b+=lw([(2.4,0.9),(3.2,0.9),(3.2,1.6),(2.4,1.6)],True,'POCKET')
# ellipse 2 x 1 (semi 1, 0.5) at (7,1.25), full
b+=P((0,'ELLIPSE'),(100,'AcDbEntity'),(8,'CURVES'),(100,'AcDbEllipse'),(10,7),(20,1.25),(30,0),(11,1),(21,0),(31,0),(210,0),(220,0),(230,1),(40,0.5),(41,0),(42,2*math.pi))
# closed cubic B-spline (clamped) through a bean shape, as an outline on its own: 7 control pts, clamped knots
cp=[(10,0),(11,0),(12,0.5),(12,1.5),(11,2),(10,2),(10,0)]
n=len(cp); k=3; knots=[0]*4+[i/(n-k) for i in range(1,n-k)]+[1]*4
s=P((0,'SPLINE'),(100,'AcDbEntity'),(8,'CURVES'),(100,'AcDbSpline'),(210,0),(220,0),(230,1),(70,8),(71,3),(72,len(knots)),(73,n),(74,0),(42,1e-10),(43,1e-10))
for kv in knots: s+=P((40,kv))
for p in cp: s+=P((10,p[0]),(20,p[1]),(30,0))
b+=s
write('curves_pocket.dxf', hdr('AC1018',1)+layers([('POCKET',7),('CURVES',3)])+ents(b)+EOF_)

# fixtures as JS for the browser tests (file:// pages cannot fetch)
F={}
for n in sorted(os.listdir(D)):
    if n.endswith(('.dxf','.dwg')):
        F[n]=open(os.path.join(D,n),'rb').read().decode('latin-1')
open(os.path.join(D,'fixtures.js'),'w').write('window.FIX='+json.dumps(F)+';\n')
print('ok',len(F))
