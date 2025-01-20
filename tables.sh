#!/bin/bash

# Fechas de inicio y fin
start_date="2025-01-20"
end_date="2025-04-07"

# Lista para almacenar los días hábiles
workdays=()

# Generar lista de días hábiles (lunes a viernes)
current_date=$(date -d "$start_date" +%s)
end_date_seconds=$(date -d "$end_date" +%s)

while [ $current_date -le $end_date_seconds ]; do
    day_of_week=$(date -d "@$current_date" +%u)
    if [ $day_of_week -le 5 ]; then # Solo lunes a viernes (1-5)
        workdays+=($(date -d "@$current_date" +%Y-%m-%d))
    fi
    current_date=$((current_date + 86400)) # Avanzar un día
done

# Seleccionar 4 días aleatorios para excluir
total_days=${#workdays[@]}
exclude_days=()
for i in {1..4}; do
    random_index=$((RANDOM % total_days))
    exclude_days+=(${workdays[$random_index]})
    # Eliminar el día seleccionado para no repetirlo
    workdays=(${workdays[@]:0:$random_index} ${workdays[@]:$((random_index + 1))})
    total_days=$((total_days - 1))
done

echo "Días sin commits: ${exclude_days[@]}"

# Generar commits para los días restantes
for day in "${workdays[@]}"; do
    # Número aleatorio de commits entre 17 y 26
    num_commits=$((RANDOM % 10 + 17)) # 17 a 26
    echo "Creando $num_commits commits para $day"
    
    for ((i=1; i<=num_commits; i++)); do
        # Modificar un archivo para el commit
        echo "Commit $i en $day" >> commits.log
        git add commits.log
        # Establecer hora aleatoria entre 8:00 y 20:00
        hour=$((RANDOM % 12 + 8))
        minute=$((RANDOM % 60))
        GIT_AUTHOR_DATE="$day $hour:$minute:00" GIT_COMMITTER_DATE="$day $hour:$minute:00" git commit -m "Commit $i del $day"
    done
done

echo "Commits generados. Usa 'git log' para verificar."