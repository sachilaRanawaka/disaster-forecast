import MySQLdb

db = MySQLdb.connect(host="localhost",    # your host, usually localhost
                     user="root",         # your username
                     passwd="",  # your password
                     db="disasterforecast")        # name of the data base
 

def dbQuery(query):
	cur = db.cursor()
	cur.execute(query)
	resultArr = []
	for row in cur.fetchall():
	    resultArr.append(row) 
	cur.close()
	return  resultArr;

