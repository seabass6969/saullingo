import csv

with open('test.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        print("{")
        print("english: '"+row[0]+"',")
        print("result: '"+row[1]+"'")
        print("},")
