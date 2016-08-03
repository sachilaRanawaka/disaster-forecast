import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model
from sklearn.cross_validation import train_test_split
from sklearn.metrics import r2_score
from datetime import datetime
from db import dbQuery 

#Colombo district

regr = linear_model.LinearRegression()
def predicRainfal():
	query = "SELECT Value,month,Year FROM rainfall_past where District = 'Colombo' and Year BETWEEN '2006' and '2013'"
	data = dbQuery(query)
	data = np.array(data) 
	data = pd.DataFrame(data)  


	Y = data.ix[:,0]
	Y = np.array(Y)
	Y = Y.astype(np.float64)

	X = np.array([(6.0, 1.0), (6.0, 2.0), (6.0, 3.0), (6.0, 4.0), (6.0, 5.0), (6.0, 6.0), (6.0, 7.0), (6.0, 8.0), (6.0, 9.0), (6.0, 10.0), (6.0, 11.0), (6.0, 12.0), (7.0, 1.0), (7.0, 2.0), (7.0, 3.0), (7.0, 4.0), (7.0, 5.0), (7.0, 6.0), (7.0, 7.0), (7.0, 8.0), (7.0, 9.0), (7.0, 10.0), (7.0, 11.0), (7.0, 12.0), (8.0, 1.0), (8.0, 2.0), (8.0, 3.0), (8.0, 4.0), (8.0, 5.0), (8.0, 6.0), (8.0, 7.0), (8.0, 8.0), (8.0, 9.0), (8.0, 10.0), (8.0, 11.0), (8.0, 12.0), (9.0, 1.0), (9.0, 2.0), (9.0, 3.0), (9.0, 4.0), (9.0, 5.0), (9.0, 6.0), (9.0, 7.0), (9.0, 8.0), (9.0, 9.0), (9.0, 10.0), (9.0, 11.0), (9.0, 12.0), (10.0, 1.0), (10.0, 2.0), (10.0, 3.0), (10.0, 4.0), (10.0, 5.0), (10.0, 6.0), (10.0, 7.0), (10.0, 8.0), (10.0, 9.0), (10.0, 10.0), (10.0, 11.0), (10.0, 12.0), (11.0, 1.0), (11.0, 2.0), (11.0, 3.0), (11.0, 4.0), (11.0, 5.0), (11.0, 6.0), (11.0, 7.0), (11.0, 8.0), (11.0, 9.0), (11.0, 10.0), (11.0, 11.0), (11.0, 12.0), (12.0, 1.0), (12.0, 2.0), (12.0, 3.0), (12.0, 4.0), (12.0, 5.0), (12.0, 6.0), (12.0, 7.0), (12.0, 8.0), (12.0, 9.0), (12.0, 10.0), (12.0, 11.0), (12.0, 12.0), (13.0, 1.0), (13.0, 2.0), (13.0, 3.0), (13.0, 4.0), (13.0, 5.0), (13.0, 6.0), (13.0, 7.0), (13.0, 8.0), (13.0, 9.0), (13.0, 10.0), (13.0, 11.0), (13.0, 12.0)])
	regr.fit(X, Y)
	y_predict = [];
	y_predict.append(regr.predict([(14,1.0)]))
	y_predict.append(regr.predict([(14,2.0)]))
	y_predict.append(regr.predict([(14,3.0)]))
	y_predict.append(regr.predict([(14,4.0)]))
	y_predict.append(regr.predict([(14,5.0)]))
	y_predict.append(regr.predict([(14,6.0)]))
	y_predict.append(regr.predict([(14,7.0)]))
	y_predict.append(regr.predict([(14,8.0)]))
	y_predict.append(regr.predict([(14,9.0)]))
	y_predict.append(regr.predict([(14,10.0)]))
	y_predict.append(regr.predict([(14,11.0)]))
	y_predict.append(regr.predict([(14,12.0)]))
	return y_predict


y_predict = predicRainfal()
y_predict = np.array(y_predict)
y_predict = y_predict.ravel() 

x_test = np.array([(14.0, 1.0),(14.0, 2.0),(14.0, 3.0),(14.0, 4.0),(14.0, 5.0),(14.0, 6.0),(14.0, 7.0),(14.0, 8.0),(14.0, 9.0),(14.0, 10.0),(14.0, 11.0),(14.0, 12.0)])


query = "SELECT Value,month FROM rainfall_past where District = 'Colombo' and Year = '2014'"
testDB = dbQuery(query)
testDB = np.array(testDB) 
testDB = pd.DataFrame(testDB)
month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
for i, m in enumerate(testDB.ix[:,1]):
	testDB.ix[i,2] = int(month.index(m) +1)

# testDB[:,2] = testDB[:,2].astype(int)

testDB = testDB.sort_values(testDB.columns[2])
y_test= testDB.ix[:,0]
y_test = np.array(y_test)
y_test= y_test.astype(np.float64)


print(y_test)
print(y_predict)

print('r value \n',r2_score(y_test, y_predict))

 
print('Coefficients: \n', regr.coef_)

# The mean square error
print("Residual sum of squares: %.2f" % np.mean((y_predict - y_test) ** 2))

# Explained variance score: 1 is perfect prediction
print('Variance score: %.2f' % regr.score(x_test, y_test))

# # Plot outputs
plt.scatter(x_test[:,1], y_test,  color='black')
plt.plot(x_test[:,1],y_predict, color='blue', linewidth=3,label="rainfall")

# plt.xticks(())
# plt.yticks(())
plt.legend()
plt.show() 

