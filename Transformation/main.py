import csv
import json

csv_file_path = 'C:\Users\USER\Repository Destination\Waste2Value-Web-App\SourceList - SourceList.csv'
json_file_path = 'dataset.json'

data = []

with open(csv_file_path, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # Change "Mechanical" to "Mechanic" in the 'Type' column
        if row['Type'] == 'Mechanical':
            row['Type'] = 'Mechanic'
        # Remove the 'Usage' column if it exists
        if 'Usage' in row:
            del row['Usage']
        data.append(row)

with open(json_file_path, 'w') as jsonfile, open(json_file_path, 'w') as jsonfile:
    json.dump(data, jsonfile, indent=4)

print(f"JSON data saved to {json_file_path}")
