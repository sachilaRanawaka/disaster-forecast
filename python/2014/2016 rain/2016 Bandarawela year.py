import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn import linear_model
from sklearn.cross_validation import train_test_split
from datetime import datetime
from db import dbQuery 

#Bandarawela district



regr = linear_model.LinearRegression()
def predicRainfal(month,monthNo):
	query = "SELECT Value,month,Year FROM rainfall_past where month='"+month+"' and District = 'Bandarawela' and Year BETWEEN '2006' AND '2015' order by FIELD(MONTH,'January','February','March','April','May','June','July','August','September','October','November','December')"
	data = dbQuery(query)
	data = np.array(data) 
	data = pd.DataFrame(data)  

	Y = data.ix[:,0]
	Y = np.array(Y)
	Y = Y.astype(np.float64)

	X = np.array([(6.0, monthNo),  (7.0, monthNo),  (8.0, monthNo),(9.0, monthNo),(10.0, monthNo),(11.0, monthNo), (12.0, monthNo), (13.0, monthNo), (14.0, monthNo), (15.0, monthNo)])
	regr.fit(X, Y)

	return regr.predict([(16,monthNo)])
 

y_predict = [];
y_predict.append(predicRainfal("January",1.0))
y_predict.append(predicRainfal("February",2.0))
y_predict.append(predicRainfal("March",3.0))
y_predict.append(predicRainfal("April",4.0))
y_predict.append(predicRainfal("May",5.0))
y_predict.append(predicRainfal("June",6.0))
y_predict.append(predicRainfal("July",7.0))
y_predict.append(predicRainfal("August",8.0))
y_predict.append(predicRainfal("September",9.0))
y_predict.append(predicRainfal("October",10.0))
y_predict.append(predicRainfal("November",11.0))
y_predict.append(predicRainfal("December",12.0))

y_predict = np.array(y_predict)
y_predict = y_predict.ravel() 

x_test = np.array([(16.0, 1.0),(16.0, 2.0),(16.0, 3.0),(16.0, 4.0),(16.0, 5.0),(16.0, 6.0),(16.0, 7.0),(16.0, 8.0),(16.0, 9.0),(16.0, 10.0),(16.0, 11.0),(16.0, 12.0)])

print(y_predict)



# x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.33, random_state=42)
 
print('Coefficients: \n', regr.coef_)


# # Plot outputs
plt.scatter(x_test[:,1],y_predict,  color='black')
plt.plot(x_test[:,1],y_predict, color='blue', linewidth=3,label="rainfall")

# plt.xticks(())
# plt.yticks(())
plt.legend()
plt.show() 

