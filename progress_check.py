with open('progress.csv') as f:
	s = f.read()
r = list(s.split('\n'))

r = r[1:]

def num(asd):
	num1 = asd[0]
	num2 = asd[1]
	n1 = list(num1.split(':'))
	n1 = int(n1[0])*60 + int(n1[1])
	n2 = list(num2.split(':'))
	n2 = int(n2[0])*60 + int(n2[1])
	return (n2-n1)


init = 0
total = 0
totalc = 0
while(init >= 0):

	wk_arr = []
	c = 0
	sum =0
	st = 'WEEK '+ str(init//7+1)
	print(st)
	for i in range(len(st)):
		print('-',end='')
	print()
	for w in range(init , init + 7):
		if(w>=len(r)):
			init = -14
			break
		i = r[w]
		x = list(i.split(','))
		if(len(x[0])!=0):
			sum += num(x[:2])
			wk_arr.append(num(x[:2]))
			c+=1
			totalc += 1

	init+=7
	print(c,'days ->',wk_arr)
	print('You have worked ',sum,' minutes',' aka', sum/60, ' hours')
	print('Averaging ',round(sum/c,2),' minutes per work day\n')
	total +=sum

print('\nIn Total, you have worked, ',total/60,'hours')
print('Averaging',total/totalc,'minutes per work day')
#END


