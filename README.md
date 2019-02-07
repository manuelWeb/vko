# Infos pour Vincent

## Taille des images
- Définition -> 96px max. 72px min.
- Horizontale
  - width max 1440px (Retina @x2 2880px à utiliser avec srcset uniquement).
- Verticale
  - 
- change depth 300 to 96px
```shell
for i in *.jpg; do convert -units PixelsPerInch $i -density 96 $i; done
```
- change width
```shell
for i in *.jpg;do convert -resize x1024 $i;done
```
- identifier le format des images
```shell
identify -format '%w x %h : %file \n' *.jpg
```
- Poids maximum pour une page web
  - 2.5 Mo, 500ko pour ne pas faire fondre la banquise.

# Gulp Starter for CSS Tricks Tutorial  
- start dev : gulp
- build : gulp build
