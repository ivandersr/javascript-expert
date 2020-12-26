# a partir da pasta raiz do projeto
find . -name *.test.js
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt

find . -name *.js -not -path '*node_modules**' | ipt  # manda os resultados de maneira interativa para o ipt

# voltando para a pasta da aula 01 mod 05
cp -r ../../modulo01/aula05-tdd-project-pt01 .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
# passa para o ipt para múltipla seleção
# cada arquivo bate no xargs, pega o aquivo e executa um comando customizado em cada um
# sed pega um espaço vazio e substitui por
# 1s -> pega a primeira linha do arquivo
# ^ -> pega a primeira coluna do arquivo
# Substitui pelo $CONTENT
# quebra a linha para adicionar um \n implícito
